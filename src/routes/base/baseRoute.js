class BaseRoute{
    static methods(){
        return Object.getOwnPropertyNames(this.prototype)
                    .filter(method => method !== 'contructor' && !method.startsWith('_'))
    }
}

module.exports = BaseRoute