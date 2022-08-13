trigger cabinUpdateTrigger on OpportunityLineItem (after insert, after update) {

    List<cabin__c> newCabinList = new List<cabin__c>();
    
    for(OpportunityLineItem oppLine : Trigger.New){
        if(oppLine.Cabin__c != null){
         
            Cabin__c cabin = [SELECT Id, Occupied__c FROM Cabin__c WHERE Id =: oppLine.Cabin__c];
            cabin.Occupied__c = true;
            newCabinList.add(cabin);
        }
    }
    update newCabinList; 
}