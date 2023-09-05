class Calculator{
    // A constructor to initialise all the values
/*  calculator(previousoperandtextelement,currentoperandtextelement) Mistake 1 - Constructor keyword is used to create
    to create a constructor in JS instead of the class name that happens in C++ */
    constructor(previousoperandtextelement,currentoperandtextelement)
    {
        this.previousoperandtextelement=previousoperandtextelement;
        this.currentoperandtextelement=currentoperandtextelement;
        this.clear();
    }

    clear(){  // Clear function to clear up all the variables to clear the screen of our calculator
       this.currentoperand=' ';
       this.previousoperand=' ';
       this.operation=undefined; // As there should not be any operation when we clear the screen
    } // We will call this clear function because as we create a new calculator it should be clear initially

    delete(){ // Delete function for removing a single number
        this.currentoperand=this.currentoperand.toString().slice(0,-1);
        this.updatedisplay();
        
    }

    appendnumber(number){  // It will append a number to the current number on calc'screen
        if(number==='.'&&this.currentoperand.includes('.')) return 
        /* If our number already contains one '.' then we don't want more decimals to be added so we
        simply return without doing anything */
        
        console.log(this.currentoperand);
        console.log(number);

        console.log(typeof(number));
        console.log(typeof(this.currentoperand));
        
        // if(this.currentoperand==='0' && number==='0'){
        //    console.log("1");
        //    return;
        // }

        console.log(this.currentoperand[0]===0);

        if(number==='0'&&this.currentoperand==="0"){
            console.log("1");
            return;
        }

      
        
        this.currentoperand=this.currentoperand.toString()+number.toString();
        /* Beacuse we want the number to be added instead of being added i.e we want 
        1+1 to be 11 not 2 */ 
    }

    chooseoperation(operation)  // It will choose an operation to perform
    {
        if(this.currentoperand==="Cannot divide by 0") return;
      if(this.currentoperand===' ') return // If current operand is empty string then we need to return without doing anything
      if(this.previousoperand!='')  // If previous operand is not empty then we should compute that first 
      {
        this.compute();
      }
      this.operation=operation;
      if(this.currentoperand[0]==="0"){
          this.currentoperand=this.currentoperand.slice(1);
      }
      this.previousoperand=this.currentoperand;
      this.currentoperand='';
    }

    compute(){  // It will choose what operation to perform
        console.log(this.previousoperand);
        console.log(this.currentoperand);
        if(isNaN(this.previousoperand) || isNaN(this.currentoperand)) return;
        var ans=0;
        switch (this.operation) {
            case '+':
                ans=this.previousoperand+this.currentoperand;
                break;

            case '-':
                ans=this.previousoperand-this.currentoperand;
                break;
                
            case '*':
                ans=this.previousoperand*this.currentoperand;
                break;
            
            case '÷':
                console.log(this.currentoperand);
                // console.log(typeof(this.currentoperand));
                if(!this.currentoperand){
                    console.log("ok");
                    ans="Cannot divide by 0";
                   
                }
                else{
                    ans=this.previousoperand/this.currentoperand;
                }
                break;


            default:
                break;
        }
        this.ans=ans;
        console.log(this.ans);
        this.operation=undefined;
        console.log(this.operation);
        this.previousoperand='';
        console.log(this.previousoperand);   
    }

    updatedisplay(){  // It will update the calculator's screen
       this.currentoperandtextelement.innerText=this.currentoperand;
       console.log(this.operation);
       console.log(this.previousoperand);
       if(this.operation!=undefined){
        //    console.log(this.previousoperand);
        //    console.log(this.operation);
           this.previousoperandtextelement.innerText=`${this.previousoperand} ${this.operation}`
           
        }
        else{
            this.previousoperandtextelement.innerText=this.previousoperand;
        }

       
        // this.previousoperandtextelement.innerText=this.previousoperand;
    //    console.log(this.currentoperandtextelement.innerText);
    }

     

}

/* The three basic things we need in a calculator is previous operand the user entered
,the current operand that they are working on and the operation to perform if selected any */

document.addEventListener('DOMContentLoaded',function(){

    const numberbuttons=document.querySelectorAll('[data-number]');
    const operationsbutton=document.querySelectorAll('[data-operation]');
    const equalsbutton=document.querySelectorAll('[data-equals]');
    const deletebutton=document.querySelector('[data-delete]');
    const allclearbutton=document.querySelector('[data-allclear]');
    const previousoperandtextelement=document.querySelector('[data-previous-operand]');
    const currentoperandtextelement=document.querySelector('[data-current-operand]');
    
       console.log(currentoperandtextelement);
    console.log(previousoperandtextelement);
    console.log(deletebutton);
    console.log(equalsbutton);
    console.log(numberbuttons);
    console.log(operationsbutton);
    console.log(allclearbutton);  

    const c1=new Calculator(previousoperandtextelement,currentoperandtextelement);
    
    numberbuttons.forEach((button) => {
       button.addEventListener('click',() => {
           c1.appendnumber(button.innerText);
           c1.updatedisplay();
       })
    });

    operationsbutton.forEach((button) => {
        button.addEventListener('click',() => {
            c1.chooseoperation(button.innerText);
            c1.updatedisplay();
        })
     });

     equalsbutton[0].addEventListener('click',() => {
        // ans=this.currentoperandans;
        c1.previousoperand=Number(c1.previousoperand);
        c1.currentoperand=Number(c1.currentoperand);
        // console.log(c1.previousoperand);
        // console.log(c1.currentoperand);
        c1.compute();
        console.log(c1.ans);
        c1.currentoperand=c1.ans;
        c1.previousoperand='';
        c1.updatedisplay();
        
        
     })

     deletebutton.addEventListener('click',() => {
        c1.delete();
     })

     allclearbutton.addEventListener('click',() => {
         c1.previousoperand='';
         c1.currentoperand='';
         c1.operation=undefined;
         c1.updatedisplay();
     })

    });

