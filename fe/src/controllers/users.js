export default {
    init() {
        this.btnEvent()
    },

    btnEvent() {
        $('.logout').on('click', () => {
            // $.ajax({
            //     url: '/api/users/signout',
            //     success(res) {
            //         location.href = 'login.html'
            //     }
            // })

            localStorage.removeItem('x-access-token')
            location.reload()
        })
    },

    getMovieList(page, limit) {
        return $.ajax({
            url: '/api/movie/list',
            data: {
                page,
                limit
            },
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            },
            dataType: 'JSON',
            success(res) {
                return res
            }
        })
    }
}