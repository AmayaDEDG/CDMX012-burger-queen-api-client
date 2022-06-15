import React  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Form } from 'reactstrap';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import '../products/ModalBox.css';
import { GrClose } from 'react-icons/gr'

//por alguna razón que no entiendo, Input de Bootstrap no funciona con useForm

const ModalBox = ({ modalStatus, toggle, formCategory, formType, onSubmit, type, category, defVal, btnText, modalTitleText}) => {

  const { register, handleSubmit, reset, formState } = useForm();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        name: '',
        price: ''
      })
    }
  }, [formState, reset])

  useEffect(() => {
    if (modalStatus === true) {
      reset({
        name: defVal.name,
        price: defVal.price,
        id: defVal.id,
        img: defVal.img
      })
    } else if (modalStatus === false) {
      reset({
        name: '',
        price: '',
        id: '',
        img: ''
      })
    }
  }, [modalStatus, defVal.name, defVal.price, defVal.id, defVal.img, reset])


  return (
    <Modal isOpen={modalStatus} toggle={toggle} centered size="lg" style={{ maxWidth: '85%', width: '100%' }} >
      <ModalHeader close={<button className="close" onClick={toggle}><GrClose /></button>}>
        <p className='modal-title'>{modalTitleText}</p>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className='input-group'>
            <Label className='bolded bigger' for='nameP'>
              Nombre:
            </Label>
            <input
              className='input-p-style large'
              type='text'
              id='nameP'
              {...register('name')}
            />
            <br />
          </FormGroup>

          <section className='second-line'>
            <FormGroup className='input-group'>
              <Label className='bolded bigger' for='idP'>
                Id:
              </Label>
              <input
                className='input-p-style'
                type='text'
                id='idP'
                placeholder='Id automático'
                readOnly
                {...register('id')}
              />
              <br />
            </FormGroup>
            <FormGroup className='input-group'>
              <Label className='bolded bigger' for='price'>
                Precio:
              </Label>
              <input
                className='input-p-style'
                type='text'
                id='price'
                {...register('price')}
              />
              <br />
            </FormGroup>
          </section>
          <section className='third-line'>
            <section className='radio-group'>
              <p className='bolded bigger'>Tipo:</p>
              <section className='radio-type'>
                <FormGroup check>
                  <input
                    type='radio'
                    id='food'
                    name='type'
                    value='Alimento'
                    onChange={formType}
                    checked={defVal.type === 'Alimento' ? true : null}
                    {...register(type)}
                  />
                  <Label for='food'>
                    Alimento
                  </Label>
                </FormGroup>

                <FormGroup check>
                  <input
                    type='radio'
                    id='drink'
                    name='type'
                    value='Bebida'
                    onChange={formType}
                    checked={defVal.type === 'Bebida' ? true : null}
                    {...register(type)}
                  />
                  <Label for='drink'>
                    Bebida
                  </Label>
                </FormGroup>

                <FormGroup check>
                  <input
                    type='radio'
                    id='extra'
                    name='type'
                    value='Extra'
                    onChange={formCategory}
                    checked={defVal.type === 'Extra' ? true : null}
                    {...register(type)}
                  />
                  <Label for='extra'>
                    Extra
                  </Label>
                </FormGroup>
              </section>
              <br />

              <p className='bolded bigger'>Categoría:</p>
              <section className='radio-type'>
                <FormGroup check>
                  <input
                    type='radio'
                    id='breakfast'
                    name='category'
                    value='Desayuno'
                    onChange={formCategory}
                    checked={defVal.category === 'Desayuno' ? true : null}
                    {...register(category)}
                  />
                  <Label for='breakfast'>
                    Desayuno
                  </Label>
                </FormGroup>

                <FormGroup check>
                  <input
                    type='radio'
                    id='lunch'
                    name='category'
                    value='Comida'
                    onChange={formCategory}
                    checked={defVal.category === 'Comida' ? true : null}
                    {...register(category)}
                  />
                  <Label for='lunch'>
                    Comida
                  </Label>
                </FormGroup>
              </section>
            </section>
            <img className='product-img' src={defVal.img} alt={defVal.name} />
          </section>
          <br />
          <FormGroup className='input-group'>
            <Label for='image' className='bolded bigger'>
              Link imagen:
            </Label>
            <input
              className='input-p-style large'
              type='text'
              id='image'
              {...register('img')}
            />
            <br />
          </FormGroup>

          <Button className='add-product'>
            {btnText}
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default ModalBox;