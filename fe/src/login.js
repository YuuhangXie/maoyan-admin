class Login {
    constructor() {
        this.init()
    }

    init() {
        $('#login').on('click', this.handleSubmit.bind(this))
    }

    handleSubmit() {
        let check = true
        this.timer = setTimeout($.proxy(function() {
            $('.input-material').each(function() {
                $(this).hasClass('is-invalid') ? check = false : ''
            })
            check ? this.handleAjax() : ''
        }, this), 100)
    }

    handleAjax() {
        let username = $('#login-username').val()
        let password = $('#login-password').val()
        $.ajax({
            url: '/api/users/signin',
            type: 'POST',
            data: {
                username,
                password
            },
            success(res) {
                if (res.ret) {
                    location.href = '/'
                } else {
                    alert(res.data.msg)
                }
            }
        })
    }
}

new Login()