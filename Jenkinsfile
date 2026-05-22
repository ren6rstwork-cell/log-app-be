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
                echo '🚀 กำลังเคลียร์ Container เก่าและรัน Backend ตัวใหม่ขึ้นมา...'
                sshagent(credentials: ['mac-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${MAC_USER}@${MAC_HOST} "
                            # 1. เช็คและสั่งลบ Container เก่าทิ้งก่อน (ถ้ามีรันอยู่) เพื่อไม่ให้พอร์ตชนกัน
                            /usr/local/bin/docker rm -f log-app-be-container || true
                            
                            # 2. สั่งรัน Container ตัวใหม่จากอิมเมจที่เราเพิ่งบิวด์สำเร็จ
                            /usr/local/bin/docker run -d \\
                                --name log-app-be-container \\
                                -p 8081:8080 \\
                                log-app-be:latest
                        "
                    """
                }
            }
        }
    } // จบ stages
} // จบ pipeline
