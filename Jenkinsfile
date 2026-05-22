pipeline {
    agent any

    environment {
        MAC_USER = 'ren' 
        MAC_HOST = 'host.docker.internal'
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo '🚚 กำลังดึงโค้ดล่าสุดจาก GitHub ส่วนตัว (Backend)...'
                checkout scm
            }
        }

        stage('2. Test Build Docker Image') {
            steps {
                echo '📦 ดึงคีย์จากระบบเซฟของ Jenkins ยิงตรงไปรัน Docker build...'
                sshagent(credentials: ['mac-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${MAC_USER}@${MAC_HOST} "cd ~/Downloads/log-app-be-main && DOCKER_CONFIG=/dev/null /usr/local/bin/docker build -t log-app-be:latest ."
                    """
                }
            }
        }

        stage('3. Check Docker Images') {
            steps {
                echo '🔍 ตรวจสอบความสำเร็จ...'
                sshagent(credentials: ['mac-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${MAC_USER}@${MAC_HOST} "DOCKER_CONFIG=/dev/null /usr/local/bin/docker images | grep log-app-be"
                    """
                }
            }
        }

        stage('4. Deploy Backend') {
            steps {
                echo '🚀 กำลังสร้างระบบเน็ตเวิร์กภายใน และเปิดตู้ MongoDB + Backend...'
                sshagent(credentials: ['mac-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${MAC_USER}@${MAC_HOST} "
                            # 1. สร้างวงเน็ตเวิร์กร่วมกันชื่อ log-app-net (ถ้ามีแล้วจะข้ามไป)
                            /usr/local/bin/docker network create log-app-net || true

                            # 2. ล้างตู้เก่าที่ค้างอยู่ออกให้หมด
                            /usr/local/bin/docker rm -f log-app-be-container || true
                            /usr/local/bin/docker rm -f mongodb || true
                            
                            # 3. 🔥 สั่งเปิดตู้ MongoDB ขึ้นมาในวงเน็ตเวิร์ก และตั้งชื่อตู้ว่า mongodb
                            /usr/local/bin/docker run -d \\
                                --name mongodb \\
                                --network log-app-net \\
                                -p 27017:27017 \\
                                mongo:latest

                            # 4. 🔥 สั่งเปิดตู้ Backend ให้อยู่ในวงเน็ตเวิร์กเดียวกัน และเปิดพอร์ตออกไปที่ 8081
                            /usr/local/bin/docker run -d \\
                                --name log-app-be-container \\
                                --network log-app-net \\
                                -p 8081:8080 \\
                                log-app-be:latest
                        "
                    """
                }
            }
        }
    } // จบ stages
} // จบ pipeline
