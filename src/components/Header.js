import PropTypes from 'prop-types';
import Button from "./Button";

const Header = ({title, onAdd, showAdd}) => {

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Show Add'} onCLick={onAdd}/>
            {/*<h1 style={headingStyle} >{title}</h1>*/}
        </header>
    );
};


/* Easy way to define the values of the props*/
Header.defaultProps = {
    title: 'Task Tracker',
    id: 'Title',
}

/* With this declaration we can define the type of data of the prop of the Component, if isRequired, etc.
 I t stills render, but there will be an error in console in order to make the code more robust and handle
 try-catch methods */
/*Also, if you want to pass a boolean or a number as a value of the prop, you need to do that into curly brackets {}
at the App.js file */
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

/* You can pass all the description about the styles of the component as a variable and then put it in the style
definition inside the Component ---> CSS in JS */
// const headingStyle = {
//     backgroundColor: 'blue',
//     color:'white'
// }

export default Header;
