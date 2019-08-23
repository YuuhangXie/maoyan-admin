export default {
    init() {
        this.btnEvent()
    },

    btnEvent() {
        $('.logout').on('click', () => {
            $.ajax({
                url: '/api/users/signout',
                success(res) {
                    location.href = 'login.html'
                }
            })
        })
    },

    getMovieList(page, limit) {
        return $.ajax({
            url: '/api/movie/list',
            data: {
                page,
                limit
            },
            dataType: 'JSON',
            success(res) {
                return res
            }
        })
    }
}