import React,{Component} from 'react'


/*Lazily function: We use lazily function inorder to reload only the function that 
we want to use. otherwise, it will reload the whole project each time we fetch one application
which is very expensive to do.

*/


const AsyncComponent=(importComponent)=>{

    return class extends Component{

        state={
            component:null
        }

        componentDidMount(){
            importComponent()
            .then(cmp=>{
                this.setState({component:cmp.default})
            })
        }
        render(){
           const C=this.state.component;
           return C?<C {...this.props}></C>:null
        }
    }

}

export default AsyncComponent;