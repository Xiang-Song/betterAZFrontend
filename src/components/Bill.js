import React from 'react'
import { Link } from 'react-router-dom'
import {Image, Row, Col, Card} from 'react-bootstrap'
import heading from '../image/heading.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

const Bill = () => {
    return (
        <div className='w-bg wide-90 m-l-5vw'>
            <Card className= 'relative border-none mt-3'>
                <Row>
                    <Col xs lg = '4'>
                    <Link to='/'><Image src={heading} className='w-30vw'/></Link>
                    </Col>
                    <Col xs lg = '8'>
                        <Card.Body className='dp-jc-end mt-0 mt-lg-3 pt-1'>
                            <Link to='/' className='link'>Home</Link>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            <h2 className = 'self-center s-title wg-bg mt-0 mt-lg-3'>Details on the Bills</h2>
            <p><strong>Referendums: Voting Rights</strong></p>
            <p><strong>SB1485</strong> Attacks Permanent Early Voting List (PEVL), now used by most Arizonans to vote. 
                It renames the list and purges it periodically. It is confusing because people who vote on election day 
                or cast an early in-person ballot could be taken off the list.  People who are mailed government notices 
                would be required to respond to stay on the list.</p>
            <p><strong>HB2569</strong> stops elections officials from receiving private grants to help them run elections 
                or register voters, even if the Legislature provides inadequate funding for elections administration and voter 
                registration. Election officials have used grant funds to purchase equipment used to provide timely and accurate 
                election results. </p>
            <p><strong>SB1819</strong> promotes a list of ten ballot fraud countermeasures, including bar and QR codes; those codes 
                could violate the ballot secrecy guarantee of the Arizona Constitution. Gives an outside group access to voter 
                registration database. Limits secretary of state's authority to defend state election laws and gives authority to 
                attorney general. Some limits only apply during the term of the current secretary of state. Requires Game and Fish to 
                assist with voter registration. Spends $500,000 to investigate social media. Requires detailed monitoring of county 
                voter registration efforts.</p>
            <br />
            <p><strong>Referendums: Education</strong></p>
            <p>The legislature passed three measures to undercut a surtax on the wealthy enacted by citizens in 2018 to fund education. </p>
            <p><strong>S.B. 1828:</strong>  Lowers the tax bracket on people who make more than $500,000 a year to 1% to offset some of 
                the education surtax.</p>
            <p><strong>S.B. 1827:</strong> If the combined tax rate for wealthy people is over 4.5% because of the education 
                surtax, lowers their state tax rates.</p>
            <p><strong>SB1783:</strong> Exempts business income reported on individual income tax returns (Chapter S) from the education 
                surtax. </p>
            <p style={{fontSize:'small'}}><strong>Initiative to Stop Dark Money: </strong></p>
            <p>"This Voters' Right to Know Act secures for Arizona voters the right to know who is trying to influence Arizona elections 
                using paid, public communications. It eliminates dark money barricades. Any person spending over $50,000 on statewide 
                campaigns or $25,000 on other campaigns must disclose the original sources (people or corporations who actually earned 
                the money) of contributions over $5,000. They must also disclose their largest donors on campaign materials. </p>
            <br />
            <div><Link to='/' className='link pad-l-5px'>Back to Home</Link></div>
            
        </div>
    )
}

export default Bill
