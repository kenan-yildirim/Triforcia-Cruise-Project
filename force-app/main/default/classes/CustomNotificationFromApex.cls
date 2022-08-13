public class CustomNotificationFromApex {
    public static void notifyUsers(Set<String> recipientsIds, String targetId){
        
        CustomNotificationType notificationType = [SELECT Id, DeveloperName FROM CustomNotificationType WHERE DeveloperName = 'Emergency_Notification'];
   	
        
        Messaging.CustomNotification notification = new Messaging.CustomNotification();
        notification.setTitle('Emergency Notification');
        notification.setBody('An Emergency Task has been raised!');
        notification.setNotificationTypeId(notificationType.Id);
        notification.setTargetId(targetId);
        
        notification.send(recipientsIds);
       
    }
}