import React, { useState } from 'react';
import styled from '@emotion/styled';
import { getYearDiference, calculateCompletePaid } from '../helpers';

const Field = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px; /* 0 para el grow, 0 para el freak, con una base de 100px */
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  --webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Button = styled.button`
  background-color: #00838F;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color .3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #26C6DA;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

export default function Form() {
  const [form, saveform] = useState({
    brand: '',
    year: '',
    plan: 'basico'
  });

  const [error, saveError] = useState(false);

  const { brand, year, plan } = form;
  
  function handleSetUserInfo(event){
    saveform({
      ...form,
      [event.target.name]: event.target.value
    })
  };

  function handleSubmit(event){
    event.preventDefault();

    if (brand.trim() === '' || year.trim() === ''  ||  plan.trim() === '' ){
      saveError(true);

      return;
    }

    saveError(false);

    let result = 2000;

    const diference = getYearDiference(year);

    result -= ((diference * 3) * result) / 100;  //resta el 3%
    console.log(brand, "brand")
    result = calculateCompletePaid(brand) * result;

    console.log(result)
  };

  return (
    <form onSubmit={handleSubmit}>
      {
        error && (
          <Error>Todos los campos son obligatorios</Error>
        )
      }
      <Field>
        <Label>Marca</Label>
        <Select name='brand' value={brand} onChange={handleSetUserInfo}>
          <option value=''>-- Seleccione --</option>
          <option value='americano'>Americano</option>
          <option value='europeo'>Europeo</option>
          <option value='asiatico'>Asiatico</option>
        </Select>
      </Field>

      <Field>
        <Label>Año</Label>
        <Select name='year' value={year} onChange={handleSetUserInfo}>
          <option value=''>-- Seleccione --</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
          <option value='2018'>2018</option>
          <option value='2017'>2017</option>
          <option value='2016'>2016</option>
        </Select>
      </Field>

      <Field>
        <Label>Plan</Label>
        <InputRadio
          type='radio'
          name='plan'
          value='basico'
          checked={plan === 'basico'}
          onChange={handleSetUserInfo}
        /> Básico

        <InputRadio
          type='radio'
          name='plan'
          value='completo'
          checked={plan === 'completo'}
          onChange={handleSetUserInfo}
        /> Completo
      </Field>

      <Button type='submit'>Cotizar</Button>
    </form>
  );
}