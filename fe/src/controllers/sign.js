export default {
    async isSignin() {
        return await $.ajax({
            url: 'api/users/isSignin',
            dataType: 'json',
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            },
            success(res) {
                return res
            }
        })
    }
}