export default {
    methods: {
        fileFmt(url){
            if(url && url.includes("/uploader/")){
                return url.split("/uploader/")[1]
            }
            return ""
        }
    },
}