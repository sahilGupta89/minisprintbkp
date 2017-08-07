exports.addNewLinking = function (token, callback) {
    let cursor = db.collection('linedAccount').find({
        linkingKey: token
    });
    cursor.toArray(function (err, result) {
        if (err) {
            cursor.close()
            callback(err, null)
        } else {
            if (result.length > 0) {
                cursor.close()
                callback(1, null)
            } else {
                //insert entry
                db.collection('linkedAccount').insert({
                    linkingKey: token
                }, function (err, inserted) {
                    cursor.close()
                    callback(null, inserted)
                })
            }
        }
    })
}

exports.addCourses = function (token, courses, callback) {
    let cursor = db.collection('linkedAccount').find({
        linkingKey: token
    })
    cursor.toArray(function (err, result) {
        if (err) {
            callback(err, null)
        } else {
            if (result.length > 0) {
                //add courses
                db.collection('linkedAccount').update({ linkingKey: token }, { $set: { courses: courses } }, { new: true }, function (err, inserted) {
                    // console.log('err', err, inserted)
                    cursor.close()
                    callback(null, inserted);
                })
            } else {
                cursor.close()
                callback(1, null)
            }
        }
    })
}

exports.getCoursesFromDb = function (token, callback) {
    let cursor = db.collection('linkedAccount').find({
        linkingKey: token
    })
    cursor.toArray(function (err, result) {
        if (err) {
            callback(err, null)
        } else {
            if (result.length > 0) {
                //add courses
                cursor.close()
                callback(null, result)
            } else {
                cursor.close()
                callback(1, null)
            }
        }
    })
}