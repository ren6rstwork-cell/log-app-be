pipeline {
    agent any

    environment {
        MAC_USER = 'ren' 
        MAC_HOST = 'host.docker.internal'
        MAC_PASS = 'Thisis2001' // ดึงจาก log ล่าสุดของคุณครับ
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo '🚚 กำลังดึงโค้ดล่าสุดจาก GitHub ส่วนตัว...'
                checkout scm
            }
        }

        stage('2. Test Build Docker Image') {
            steps {
                echo '📦 กำลังส่งคำสั่งพร้อมรหัสผ่านข้ามไปรัน Docker build บนเครื่อง Mac...'
                // 🔥 เปลี่ยนจากคำว่า docker เฉยๆ เป็น /usr/local/bin/docker
                sh """
                    apt-get update && apt-get install -y sshpass
                    sshpass -p '${MAC_PASS}' ssh -o StrictHostKeyChecking=no ${MAC_USER}@${MAC_HOST} "cd ~/Downloads/log-app-be-main && /usr/local/bin/docker build -t log-app-be:latest ."
                """
            }
        }

        stage('3. Check Docker Images') {
            steps {
                echo '🔍 ตรวจสอบความสำเร็จของการแพ็กไฟล์บนเครื่อง Mac...'
                // 🔥 ตรงนี้ก็เปลี่ยนเป็น /usr/local/bin/docker เช่นกันครับ
                sh """
                    sshpass -p '${MAC_PASS}' ssh -o StrictHostKeyChecking=no ${MAC_USER}@${MAC_HOST} "/usr/local/bin/docker images | grep log-app-be"
                """
            }
        }
    }
}
