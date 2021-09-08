import React from "react";
import axios from "axios";


class App extends React.Component{
        constructor(props)
        {
            super(props);
            this.state={

                posts:[],
                userId:"",
                title:"",
                body:"",
                id:"",
            };
        }
        
        //fetch api to get users
        getusers= async()=>{
            try{
                const {data} = await axios.get("https://jsonplaceholder.typicode.com/posts");
                let posts = [...data];
                this.setState({posts});
                console.log(this.state.posts);

            }
            catch(err){
                    console.log("GET:"+ err);
            }
            
        }
          //to call getusersmethod when components mounted
        componentDidMount()
        {
            this.getusers();
        }

        //to fetch api and delete a user
        deleteusers= async(id)=>{
            try{
                await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
                let posts = [...this.state.posts];//make a copy of posts
                posts = posts.filter((p)=>p.id!==id);//filter the deleted id from post
                this.setState({posts});//set the newly created posts
            }
            catch(err)
            {
                console.log("Delete:" +err);
            }
           
        }
       
        //to make changes in inputfield
        handleChange=({target:{name,value}})=>{
              this.setState({[name]:value});
              
        }
        //to handle sumbit
        handleSubmit=(event)=>{
             event.preventDefault();

             if(this.state.id==="")//check whether the state have id if not then the userdata already exists so we have to update it
             {
                this.createUser();
             }
             else
             {
                 this.updateUser();
             }
        }

          //creates a new user and fetch ito api
        createUser= async()=>{
            try{
                const {userId,title,body} = this.state;
                 const {data:post} = await axios.post("https://jsonplaceholder.typicode.com/posts",{
                    userId,
                    title,
                    body
                 });
                 let posts = [...this.state.posts];
                 posts.push(post);//the created user pushed into posts
                 this.setState({posts,userId:"",title:"",body:""});//set the state to update posts array
            }
            catch(err)
            {
                console.log("post:" +err);
            }
        }
         
        //this will display data in the input field when click update button
        updateinput=(post)=>
        {
           this.setState({...post});
        }
         
        //this will update user by fetch api
        updateUser= async()=>{
            try{
                const{userId,id,title,body} = this.state;
                const {data:put} = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,{
                    userId,
                    title,
                    body
                });
                let posts = [...this.state.posts];
                let index = posts.findIndex((p)=>p.id===id);//find the index that updated
                posts[index] = put;//changed that index value to updated value
                this.setState({posts});//set the state to update the posts
            }
            catch(err)
            {
                console.log("Update:"+err);
            }
        }
        render()
        {
            return(
                <React.Fragment>
                    <h3>Post APP</h3>
                       <form onSubmit={this.handleSubmit}>
                           <div>
                               <label>User ID:</label>
                               <input type="number" name="userId" value={this.state.userId} onChange={this.handleChange} ></input>
                           </div><br/>
                           <div>
                               <label>Title:</label>
                               <input type="text" name="title" value={this.state.title} onChange={this.handleChange} ></input>
                           </div><br/>
                           <div>
                               <label>Body:</label>
                               <input type="text" name="body" value={this.state.body} onChange={this.handleChange}></input>
                           </div><br/>
                           <div>
                               <button type="submit">Submit</button>
                           </div>
                       </form>
                    <table>
                        <thead>
                        <tr>
                        <th>PostID</th>
                        <th>UserID</th>
                        <th>Title</th>
                        <th>Body</th>
                        </tr>
                        </thead>
                        <tbody>
                         {
                             this.state.posts.map((post)=>{
                                 return <tr>
                                       <td>{post.userId}</td>
                                       <td>{post.id}</td>
                                       <td>{post.title}</td>
                                       <td>{post.body}</td>
                                       <td>
                                       <button onClick={()=>this.deleteusers(post.id)}>Delete</button>
                                       <button onClick={()=>this.updateinput(post)}>Update</button>
                                       </td>
                                       
                                     </tr>   
                             })
                         }
                        </tbody>
                    </table>
                </React.Fragment>
             
            );

        }
}

export default App;