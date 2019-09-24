class Register {
    constructor() {
        this.init()
    }

    init() {
        $('#regidter').on('click', this.handleSubmit.bind(this))
    }

    handleSubmit() {
        let check = true
        this.timer = setTimeout($.proxy(function() {
            $('.form-validate input').each(function() {
                $(this).hasClass('is-invalid') ? check = false : ''
            })
            check ? this.handleAjax() : ''
        }, this), 500)
    }

    handleAjax() {
        let username = $('#register-username').val()
        let email = $('#register-email').val()
        let password = $('#register-password').val()
        $.ajax({
            url: '/api/users/signup',
            type: 'POST',
            data: {
                username,
                email,
                password
            },
            success(res) {
                console.log(res)
                if (res.ret) {
                    location.href = 'login.html'
                } else {
                    alert(res.data.msg)
                }
            }
        })
    }
}

new Register()