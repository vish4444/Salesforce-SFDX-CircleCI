public class HelloWorld {

    @AuraEnabled
    public static Contact getContact(Id record) {
        System.debug('record---->'+record);
        Contact con = [Select LastName From Contact where Id =: record Limit 1];
        System.debug('con---->'+con);
        return con;
    }
}