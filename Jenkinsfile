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
                echo '🚀 สลับมาใช้โหมด Host Network เพื่อให้แอปวิ่งหา MongoDB บน localhost ได้ทันที...'
                sshagent(credentials: ['mac-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${MAC_USER}@${MAC_HOST} "
                            # 1. ลบคอนเทนเนอร์หลังบ้านตัวเก่าออกก่อน
                            /usr/local/bin/docker rm -f log-app-be-container || true
                            
                            # 2. 🔥 รันด้วยโหมด --network host (ไม่ต้องใส่ -p 8081:8080 แล้วครับ มันจะแชร์พอร์ต 8080 ร่วมกับ Mac ตรงๆ)
                            /usr/local/bin/docker run -d \\
                                --name log-app-be-container \\
                                --network host \\
                                log-app-be:latest
                        "
                    """
                }
            }
        }
    } // จบ stages
} // จบ pipeline
