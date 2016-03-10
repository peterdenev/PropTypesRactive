//var app = new Ractive({
var app = new PropTypesRactive({
  	el: '.mainContainer',
  	components:{
		Checkbox: Checkbox,
		Button: Button,
	},
  	template: `
  		{{#each options}} 
  			<Checkbox rightLabel="{{.}}" id="{{.}}" tabindex="15" /> <br>
  		{{/each}}
  		<Button clickHandler="{{btnClick}}" text="GO" />
  	`,
	data:{
		options:['I','You','He','She','It'],
		btnClick: function(){
			console.log(arguments);
		}
	},
	
})