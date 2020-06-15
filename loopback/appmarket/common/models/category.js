'use strict';

module.exports = function(Category) {
    Category.validatesUniquenessOf('category', { message: 'Essa categoria já está cadastrada'});
};
