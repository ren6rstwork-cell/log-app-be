pipeline {
    agent any

    environment {
        // 🔹 ใส่ชื่อ Username เครื่อง Mac ของคุณ (จาก log คุณใช้ 'ren')
        MAC_USER = 'ren' 
        MAC_HOST = 'host.docker.internal'
        
        // 🔥 สำคัญ: ใส่รหัสผ่านที่คุณใช้ล็อกอินเข้าเครื่อง Mac ตอนเปิดเครื่องตรงนี้
        MAC_PASS = 'Thisis2001' 
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
                // เราจะแอบดาวน์โหลดเครื่องมือ sshpass ตัวเล็กๆ มาช่วยป้อนรหัสผ่านให้ฝั่ง Jenkins อัตโนมัติ
                sh """
                    apt-get update && apt-get install -y sshpass
                    sshpass -p '${MAC_PASS}' ssh -o StrictHostKeyChecking=no ${MAC_USER}@${MAC_HOST} "cd ~/Downloads/log-app-be-main && docker build -t log-app-be:latest ."
                """
            }
        }

        stage('3. Check Docker Images') {
            steps {
                echo '🔍 ตรวจสอบความสำเร็จของการแพ็กไฟล์บนเครื่อง Mac...'
                sh """
                    sshpass -p '${MAC_PASS}' ssh -o StrictHostKeyChecking=no ${MAC_USER}@${MAC_HOST} "docker images | grep log-app-be"
                """
            }
        }
    }
}
