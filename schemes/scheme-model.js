const db = require('../data/db-config')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes').where({ id }).first();
}

function findSteps(scheme_id) {
    return db('steps')
    .join('schemes', 'schemes.id', 'steps.scheme_id')
    .select('steps.id', 'steps.instructions', 'schemes.scheme_name')
    .where({ scheme_id })
}

function add(scheme) {
    return db('schemes').insert(scheme)
    .then(ids => {
        return findById(ids[0])
    })
}

function update(changes, id) {
    return db('schemes').where({ id }).update(changes);
}

function remove(id) {
    return db('schemes').where({ id }).del();
}