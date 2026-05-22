pipeline {
    agent any

    environment {
        // 🔥 เปลี่ยนคำว่า 'ชื่อUserเครื่องMacของคุณ' ให้เป็น Username จริงของเครื่อง Mac คุณ
        MAC_USER = 'Administrators'
        // host.docker.internal คือที่อยู่พิเศษที่ทำให้ Docker ข้างในวิ่งเจอเครื่อง Mac ข้างนอก
        MAC_HOST = 'host.docker.internal' 
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
                echo '📦 กำลังส่งคำสั่งข้ามไปรัน Docker build บนเครื่อง Mac...'
                // สั่งผ่าน SSH ด้วยโปรแกรม sshpass เพื่อไม่ต้องกรอกรหัสผ่านด้วยมือ
                // หมายเหตุ: สั่งให้เข้าไป build ในโฟลเดอร์ Downloads ของ Mac ที่คุณแตกไฟล์ไว้
                sh """
                    ssh -o StrictHostKeyChecking=no ${MAC_USER}@${MAC_HOST} "cd ~/Downloads/log-app-be-main && docker build -t log-app-be:latest ."
                """
            }
        }

        stage('3. Check Docker Images') {
            steps {
                echo '🔍 ตรวจสอบความสำเร็จของการแพ็กไฟล์บนเครื่อง Mac...'
                sh """
                    ssh -o StrictHostKeyChecking=no ${MAC_USER}@${MAC_HOST} "docker images | grep log-app-be"
                """
            }
        }
    }
}
