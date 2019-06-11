({
	doInit: function (component, event, helper) {
		var val = component.find("myInput").get("v.value");
		component.set("v.predicate", val);
		var action = component.get("c.getContact");
		action.setParams({
			"record": component.get("v.recordId")
		});

		// Create a callback that is executed after 
		// the server-side action returns
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				var con = response.getReturnValue();
				component.set("v.subject", con.LastName);
			} else if (state === "INCOMPLETE") {
				// do something
			} else if (state === "ERROR") {
				var errors = response.getError();
				if (errors) {
					if (errors[0] && errors[0].message) {
						console.log("Error message: " +
							errors[0].message);
					}
				} else {
					console.log("Unknown error");
				}
			} else {
				console.log("Unknown error");
			}
		});
		$A.enqueueAction(action);
	}
})