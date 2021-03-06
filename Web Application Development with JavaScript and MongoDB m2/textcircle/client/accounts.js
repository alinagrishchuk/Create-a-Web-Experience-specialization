/**
 * Created by ALINA on 20.05.2016.
 */
console.log("accounts..");

Accounts.ui.config({
	requestPermissions: {},
	extraSignupFields: [{
		fieldName: 'first-name',
		fieldLabel: 'First name',
		inputType: 'text',
		visible: true,
		validate: function(value, errorFunction) {
			if (!value) {
				errorFunction("Please write your first name");
				return false;
			} else {
				return true;
			}
		}
	}, {
		fieldName: 'last-name',
		fieldLabel: 'Last name',
		inputType: 'text',
		visible: true,
	}, {
		fieldName: 'gender',
		showFieldLabel: false,      
		fieldLabel: 'Gender',
		inputType: 'radio',
		radioLayout: 'vertical',    
		data: [{                    
			id: 1,                  
			label: 'Male',          
			value: 'm'              
		}, {
			id: 2,
			label: 'Female',
			value: 'f',
			checked: 'checked'
		}],
		visible: true
	}, {
		fieldName: 'country',
		fieldLabel: 'Country',
		inputType: 'select',
		showFieldLabel: true,
		empty: 'Please select your country of residence',
		data: [{
			id: 1,
			label: 'United States',
			value: 'us'
		}, {
			id: 2,
			label: 'Spain',
			value: 'es',
		}],
		visible: true
	}, {
		fieldName: 'terms',
		fieldLabel: 'I accept the terms and conditions <a href="">See t and x...</a>',
		inputType: 'checkbox',
		visible: true,
		saveToProfile: false,
		validate: function(value, errorFunction) {
			if (value) {
				return true;
			} else {
				errorFunction('You must accept the terms and conditions.');
				return false;
			}
		}
	}]
});
