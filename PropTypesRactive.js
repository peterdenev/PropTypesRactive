var PropTypesRactive = Ractive.extend({
	propTypes:{},

	stopRender: false,
	propTypesChecker: function(data){
		return RecordValidator.check(this.propTypes, data)
	},
	propTypesCheck:function(teredownOnError){
		teredownOnError = typeof teredownOnError !== 'undefined' ? teredownOnError : true;
		var checkResult = this.propTypesChecker(this.get(''));
		if(checkResult!==true){
			//debugger;
			var hasComponentName = RecordValidator.buildChecker({
				component:{'name':'string'}
			}) 
			var ctx = this;
			var path = '';
			while( hasComponentName(ctx) === true ){
				path = '.'+ctx.component.name + path;
				ctx = ctx.parent;				
			}
			path = 'ROOT'+path;

			console.warn(
				path,
				checkResult,
				this.get('')
			)
			if(teredownOnError){
				this.stopRender = true;
				this.teardown();
			}
		}else{
			this.stopRender = false;
		}
		return checkResult
	},


	propTypesObserver:{
		cancel:function(){
			console.log('propTypesObserver was not initialized! Did you forget to call it on init?')
		}
	},
	isPropTypesObserveActive: false,
	checkComponentsPropTypes: function(){
		//this.propTypesCheck(); //only parent check children 
		this.findAllComponents().forEach(function(el, i, all){
			el.propTypesCheck();
		})
	},
	propTypesObserverStart: function(){
		this.propTypesObserver = this.observe( '*', function ( newValue, oldValue, keypath ) {			
			if(this.isPropTypesObserveActive){
				this.checkComponentsPropTypes()
			}
		});	
	},
	propTypesObserverStop: function(){
		this.propTypesObserver.cancel();
	},
	componentsPropTypesObserve:function(){
		this.propTypesObserverStart();//start observe (but no action)
		this.checkComponentsPropTypes(); //init check
		this.isPropTypesObserveActive = true; //open the observer to actions
		//stop rendering on init if propType error
		if(this.stopRender){
			this.teardown();
		}
	},

	onrender:function(){	
		//copy this in extended components if overwrite 	
		this.componentsPropTypesObserve();		
	},
	
})