import React, { Component } from 'react'
import { Navbar, NavbarBrand,  NavItem, Nav, Collapse, NavbarToggler, NavLink, Button } from 'reactstrap'

export default class Banner extends Component {
    state={loggedIn:false,open:false}
    componentDidMount(){
        this.setState({
            loggedIn:this.props.isLoggedIn})

    }
    logout=()=>{
        sessionStorage.clear()
        window.location ='/'
    }
    render() {
        return (
            <div>
                <Navbar expand='md' dark color='dark' >
                    <NavbarBrand href='/'><small>Bkeeper</small></NavbarBrand>
                    <NavbarBrand>{this.props.studioName}</NavbarBrand>
                    <NavbarToggler onClick={()=>this.setState({open:!this.state.open})}/>
                    <Collapse navbar isOpen={this.state.open}>        
                        <Nav className='mr-auto' navbar >
                        { this.state.loggedIn ? [
                            <NavItem key='/home'       ><NavLink href='/'            >Home           </NavLink></NavItem>,
                            <NavItem key='/roster'     ><NavLink href='/roster'      >Roster         </NavLink></NavItem>,
                            <NavItem key='/addband'    ><NavLink href='/addband'     >Add Band       </NavLink></NavItem>,
                            <NavItem key='/addproject' ><NavLink href='/addproject'  >Add Project    </NavLink></NavItem>,
                            <NavItem key='/payment'    ><NavLink href='/payment'     >Add Payment    </NavLink></NavItem>,
                            <NavItem key='/appointment'><NavLink href='/appointment' >Add Appointment</NavLink></NavItem>,
                            <NavItem key='/ledger'     ><NavLink href='/ledger'      >Ledger         </NavLink></NavItem>,
                            <NavItem key='/addsession' ><NavLink href='/addsession'  >Add Session    </NavLink></NavItem>,
                            <NavItem key='button'><Button color='danger' onClick={this.logout}>Log Out</Button></NavItem>
                        ]  :[
                            <NavItem key='/register'   ><NavLink href='/register'    >Register       </NavLink></NavItem>,
                            <NavItem key='/login'      ><NavLink href='/login'       >Login          </NavLink></NavItem>,
                            ]
                        }
                        </Nav>
                        
                    </Collapse> 
                </Navbar>
            </div>
        )
    }
}
