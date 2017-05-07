export default {
    state: {
        schema: {
            name: 'permission',
            label: '权限',
            attribute:{
                selection:true
            },
            fields: [
                {
                    name : 'name',
                    label : "权限名称"
                },
                {
                    name : 'code',
                    label : "权限代码"
                }
            ],
            operation:{
                edit:true,
                delete:true,
                add:true
            },
            views: {
                add: ['name', 'code'],
                edit: ['name']
            }
        },

    }
}
