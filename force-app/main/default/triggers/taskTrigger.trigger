trigger taskTrigger on Task (before insert){        
      for(Task t : Trigger.New){
          if(t.Subject == 'Emergency'){
             t.Priority = 'High';
             
             Set<String> recipinetsIds = new Set<String>();
             recipinetsIds.add('005IY000000LSUVYA4');
             
             CustomNotificationFromApex.notifyUsers(recipinetsIds, '000000000000000AAA');
              
          }
        
    }
    
}