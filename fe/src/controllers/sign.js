export default {
    async isSignin() {
        return await $.ajax({
            url: 'api/users/isSignin',
            dataType: 'json',
            success(res) {
                return res
            }
        })
    }
}