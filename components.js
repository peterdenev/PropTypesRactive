
var Checkbox = PropTypesRactive.extend({
	isolated: true,
	template: `
		<label>
			{{leftLabel}}
			<input type="checkbox" id="{{id}}" tabindex="{{tabindex}}" />
			{{rightLabel}}
		</label>
	`,
	data:{	
		leftLabel:'',		
		id: '',
		rightLabel:'',	
		tabindex: 99999,
	},

	propTypes:{
		leftLabel:'string',	
		id: 'string',
		rightLabel:'string',
		tabindex: 'number'
	},	
		
})

var Button = PropTypesRactive.extend({
	isolated: true,
	template: `
		<input type="button" id="{{id}}" on-click="clickHandler" value="{{text}}"/>		
	`,
	data:{	
		clickHandler: function(){},		
		id: '',
		text:'Button',			
	},

	propTypes:{
		clickHandler:'function',		
		id: 'string',
		text:'string',		
	},

	oninit:function(){
		this.on('clickHandler',this.get('clickHandler'));
	}
		
})

