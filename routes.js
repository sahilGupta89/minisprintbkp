let mongo = require('./mongo');
let needle = require('needle');
exports.linkAccount = function (req, res) {
    // Get the documents collection
    let token = req.query.token ? req.query.token : '';
    if (token) {
        mongo.addNewLinking(token, function (err, result) {
            if (err) {
                if (err == 1) {
                    res.send('Already Exist')
                } else {
                    res.send(err)
                }
            } else {
                res.send({
                    message: 'success',
                    status: 200
                })
            }
        })
    } else {
        res.send({
            message: 'Please provide token',
            status: 400
        })
    }
}

exports.addCourses = function (req, res) {
    if (req.query.token) {
        let options = {
            JSON: true,
            headers: {
                'Authorization': 'Bearer lcxrsyc1DpYO3wJnC3ZHbrVWqimz3mRuB7CM82OIhPHGqacJlGTn3MwF3wzGEcq4',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        needle.get('http://canvas.differ.chat/api/v1/courses', options, function (err, result, body) {
            if (!err) {
                // let prepCourse = {}
                for (i = 0; i < body.length; i++) {
                    delete body[i]['workflow_state']
                    delete body[i]['sis_course_id']
                    delete body[i]['integration_id']
                    delete body[i]['storage_quota_mb']
                }
                mongo.addCourses(req.query.token, body, function (err, result) {
                    console.log('err,result', err, result)
                    res.send({
                        message: 'success',
                        status: 200,
                        data: body
                    })
                })
                // console.log('response', err, result)
            }
        })
    } else {
        res.send({
            message: 'Please send token',
            status: 400,
            data: []
        })
    }

}

exports.getCourses = function (req, res) {
    if (req.query.token) {
        mongo.getCoursesFromDb(req.query.token, function (err, result) {
            if (err) {
                res.send({
                    message: 'Please check token',
                    status: 400,
                    data: []
                })
            } else {
                // for (i = 0; i < result.length; i++) {
                //     delete result[i]['_id']
                //     delete result[i]['linkingKey']
                // }
                res.send({
                    message: 'success',
                    status: 200,
                    data: result[0].courses
                })
            }
        })
    } else {
        res.send({
            message: 'Please send token',
            status: 400,
            data: []
        })
    }
}