import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecordAsso } from '../views/Administrator/addUser/RecordAsso';
import {BrowserRouter as Router} from 'react-router-dom';



describe('RecordAsso view renders elements', () => {

    test('renders Burger Queen logo', () => {

      render(
          <Router>
            <RecordAsso/>
          </Router>);
      const bqLogo = screen.getByAltText(/Burger Queen Logo/i);
      expect(bqLogo).toBeInTheDocument();
    });
  
    test('renders btn back', () => {
      render(
          <Router>
            <RecordAsso/>
          </Router>);
      const btnBack = screen.getByAltText(/Volver/i);
      expect(btnBack).toBeInTheDocument();
    });
  
    test('renders name input', () => {
      render( 
      <Router>
        <RecordAsso/>
      </Router>);
      const name = screen.getByPlaceholderText(/Ej. Amaya de Esesarte/i);
      expect(name).toBeInTheDocument();
    });
  
    test('renders email input', () => {
        render( 
        <Router>
          <RecordAsso/>
        </Router>);
        const email = screen.getByPlaceholderText(/Ej. amaya@burgerqueen.com/i);
        expect(email).toBeInTheDocument();
      });

      test('renders password input', () => {
        render( 
        <Router>
          <RecordAsso/>
        </Router>);
        const password = screen.getByPlaceholderText(/Ej. ama1234/i);
        expect(password).toBeInTheDocument();
      }); 

      test('renders age input', () => {
        render( 
        <Router>
          <RecordAsso/>
        </Router>);
        const age = screen.getByPlaceholderText(/Ej. 24 años/i);
        expect(age).toBeInTheDocument();
      }); 

      test('renders phone input', () => {
        render( 
        <Router>
          <RecordAsso/>
        </Router>);
        const phone = screen.getByPlaceholderText(/Ej. 55 36 56 95 12/i);
        expect(phone).toBeInTheDocument();
      }); 

    /*  test('renders emergency input', () => {
        render( 
        <Router>
          <RecordAsso/>
        </Router>);
        const emergency = screen.getByPlaceholderText(/Ej. Mariana  55 36 56 95 12/i);
        expect(emergency).toBeInTheDocument();
      }); 
*/
      test('renders date input', () => {
        render( 
        <Router>
          <RecordAsso/>
        </Router>);
        const date = screen.getByPlaceholderText(/Ej. 25 - 05 -2022/i);
        expect(date).toBeInTheDocument();
      }); 

      test('renders Contract input', () => {
        render( 
        <Router>
          <RecordAsso/>
        </Router>);
        const Contract = screen.getByPlaceholderText(/Ej. Tiempo completo/i);
        expect(Contract).toBeInTheDocument();
      }); 

      test('renders Time input', () => {
        render( 
        <Router>
          <RecordAsso/>
        </Router>);
        const Time = screen.getByPlaceholderText(/Ej. 8:00 - 16:00/i);
        expect(Time).toBeInTheDocument();
      }); 

      test('renders btn record', () => {
        render(
            <Router>
              <RecordAsso/>
            </Router>);
       const button = screen.getByRole('button', { name: 'Dar de alta' });
       expect(button).toBeInTheDocument();
      });
   /* test('renders password input', () => {
      render(<RecordAsso/>);
      const password = screen.getByPlaceholderText(/Contraseña/i);
      expect(password).toBeInTheDocument();
    });
  
    test('renders see-password icon', () => {
      render(<RecordAsso/>);
      const eyeIcon = screen.getByAltText(/Eye icon/i);
      expect(eyeIcon).toBeInTheDocument();
    });
  
    test('renders sign in buttont', () => {
      render(<RecordAsso/>);
      const button = screen.getByRole('button', { name: 'Ingresar' });
      expect(button).toBeInTheDocument();
    });*/
  
  });