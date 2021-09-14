import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import MaterialTable from 'material-table';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UseToast } from '../../hooks/ToastContext';
import { localization } from '../../utils/LocaleTable';
import Button from '../Button';
import Modal from '../Modal';
import * as yup from 'yup';
import { Container, Header, Filial, Content, ComboBox } from './styles';
import GetvalidationErrors from '../../utils/getValidationerros';
import Input from '../Input';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../../services/Apiclient';
import { PropsEmployee, PropsFiliais } from '../../utils/DefaultProps';
import { GrAdd } from 'react-icons/gr';


const Contributors: React.FC = () => {
    const comboBoxClass = ComboBox();
    const formRef = useRef<FormHandles>(null);
    const [selectedidFilial, setSelectedidFilial] = useState<string | null>(null); // guarda o id do item selecionado no componente Autocomplete
    const [method, setMethod] = useState<"insert" | "update">("insert");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [employee, setEmployee] = useState<PropsEmployee[]>([]);
    const [employeeSelected, setEmployeeSelected] = useState<PropsEmployee | null>(null);
    const [filiais, setFiliais] = useState<PropsFiliais[]>([]);
    const { addToast } = UseToast();
    const columns = [
        { title: "Id", field: "id" },
        { title: "Nome funcionário", field: "name" },
        { title: "Filial", field: "filial.name" },
    ];

    useEffect(() => {
        api.get('filiais').then(response => setFiliais(response.data));
        api.get('allfuncionarios').then(response => setEmployee(response.data));

    }, []);

    useEffect(() => {
        if (filiais.length > 0) {
            setSelectedidFilial(filiais[0].id);
        }
    }, [filiais]);

    //# função que seleciona o metodo  a ser usado na modal
    const SelectMethod = useCallback(async (method: "insert" | "update") => {
        setMethod(method);
        setOpenModal(true)
        
    }, []);

    const Cancelar = useCallback(() => {
        setEmployeeSelected(null); 
        setOpenModal(false);
        if(filiais.length>0){
            setSelectedidFilial(filiais[0].id);
        }
        
    }, [filiais]);
    //# função que verifica o metodo selecionado em SelectMethod e executa uma função de acordo
    const ActionEmployee = useCallback(async (data: PropsEmployee) => {
        try {
            formRef.current?.setErrors({});
            const schema = yup.object().shape({
                name: yup.string().required('O nome é obrigatório'),
            });

            await schema.validate(data, { abortEarly: false });

            var Data = {};
            if (method == "insert") {
                Data = {
                    name: data.name,
                    filial_id: selectedidFilial,
                }
                AddEmployee(Data);
            } else {

                if(employeeSelected!.name == data.name && employeeSelected?.filial.id == selectedidFilial){
                    throw new Error("Os dois campos estão como antes, para atualizar altere pelo menos um!");
                }
                Data = {
                    id: employeeSelected!.id || "",
                    name: data.name,
                    filial_id: selectedidFilial,
                }
                UpdateEmployee(Data);
            }
        } catch (err) {

            let errormsg = err;
            if (err instanceof yup.ValidationError) {
                const erros = GetvalidationErrors(err);
                errormsg =erros;
            }
            if (err instanceof Error) {
                errormsg = err;  
            }
            addToast({
                type: 'error',
                title: 'Algo deu errado',
                description: `${errormsg}`
            });
        }
    }, [method, formRef, selectedidFilial, employeeSelected]);

    const AddEmployee = useCallback(async (data: object) => {
        try {
            //@ts-ignore
            await api.post('funcionarios', { name: data.name, filial_id: data.filial_id }).then(response => {
                setEmployee(olddata => [...olddata, response.data]);
                addToast({
                    type: 'success',
                    title: 'Sucesso',
                    //@ts-ignore
                    description: `${data.name} salvo com sucesso!`
                });
            }).catch(err => {
                throw new Error(err.response.data.message);
            })
            setOpenModal(false);
        } catch (err) {

            let errormsg = err;
            if (err instanceof Error) {
                errormsg = err;  
            }
            addToast({
                type: 'error',
                title: 'Erro',
                description: `${errormsg}`
            });
        }

    }, [employee]);

    const UpdateEmployee = useCallback(async (data: object) => {
        try {

            await api.put('funcionarios', data).then(response => {
                const temp = [...employee];
                temp.find(item => {
                    //@ts-ignore
                    if (item.id == data!.id) {
                        //@ts-ignore
                        item.name = data.name;
                        item.filial = response.data.filial;
                    }
                })
                setEmployee(temp);
                setEmployeeSelected(null);
                setSelectedidFilial(filiais[0].id);
                addToast({
                    type: 'success',
                    title: 'Sucesso',
                    //@ts-ignore
                    description: `${data.name} atualizado com sucesso!`
                });
            }).catch(err => {
                throw new Error(err.response.data.message);
            })

            setOpenModal(false);
            setEmployeeSelected(null)
        } catch (err) {
            let errormsg = err;
            if (err instanceof Error) {
                errormsg = err;  
            }
            addToast({
                type: 'error',
                title: 'Erro',
                description: `${errormsg}`
            });
        }

    }, [employee,selectedidFilial,employeeSelected]);

    // # recebe o objeto selecionado na tabela e busca seu equivalente no array filiais
    // e preenche e constante setfilialSelected usda para atualização  
    const findEmployeeForUpdate = useCallback((data: object) => {
        var id = "";
        for (const [key, value] of Object.entries(data)) {
            if (key == "id") {
                id = value;
                break;
            }
        }
        const Contributor = employee.find(item => item.id == id);
        setEmployeeSelected(Contributor!);
    }, [employee]);
    return (
        <>
            <Content>
                <MaterialTable
                    title={<Button icon={GrAdd} onClick={() => SelectMethod("insert")} stylecolor="transparent" style={{ width: 200, height: 30, borderRadius: 5, marginTop: 10, fontSize: 15 }} label="Adicionar funcionário" />}
                    data={employee}
                    columns={columns}
                    localization={localization}
                    style={{color:"#5C5C5C"}}
                    options={{
                        paging: true,
                        pageSize: 10,
                        maxBodyHeight: 450,
                        addRowPosition: 'first',
                        headerStyle:{
                            fontWeight:700,
                            fontSize:16,
                            color:"#5C5C5C"
                        }
                    }}
                    editable={{
                        onRowDelete: oldData =>
                            new Promise<void>((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...employee];
                                    for (const [key, value] of Object.entries(oldData)) {
                                        if (key == "tableData") {
                                           const selected = dataDelete.splice(value.id, 1)[0];
                                            
                                            api.delete(`funcionarios?id=${selected.id}`).then(response => {
                                                addToast({
                                                    type: 'info',
                                                    title: 'Sucesso',
                                                    //@ts-ignore
                                                    description: `${selected.name} deletado com sucesso!`
                                                });
                                                setEmployee([]);
                                                setEmployee([...dataDelete]);
                                            }).catch(err=>{
                                                addToast({
                                                    type: 'error',
                                                    title: 'Erro ao deletar',
                                                    //@ts-ignore
                                                    description: `Não foi possivel deletar o funcionário ${selected.name}`
                                                }); 
                                            });;
                                            
                                            break;
                                        }
                                    }
                                    resolve();
                                }, 1000)
                            }),

                    }}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Editar',
                            onClick: (event, rowData) => {
                                SelectMethod("update");
                                setOpenModal(true);
                                findEmployeeForUpdate(rowData);

                            }
                        }
                    ]}
                >
                </MaterialTable>

            </Content>
            {openModal && (
                <Modal title="Adicionar funcionário" isVisible={openModal}>
                    <Filial>
                        <Form ref={formRef} onSubmit={ActionEmployee}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 150 }}>
                                <label> Nome
                                    <Input style={{borderRadius:10}} name="name" defaultValue={employeeSelected ? employeeSelected.name : ""}  />
                                </label>
                                <label> Filial
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={filiais}
                                        classes={comboBoxClass}
                                        getOptionLabel={(option) => option.name}
                                        defaultValue={employeeSelected ? employeeSelected!.filial : filiais[0]}
                                        onChange={(event, value) => setSelectedidFilial(value!.id)}
                                        renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                                    />
                                </label>
                            </div>
                            <div>
                                <Button type="submit" style={{ width: 200 }} stylecolor="ok" label="Salvar" />
                                <Button type="button" onClick={Cancelar} style={{ width: 200 }} stylecolor="cancel" label="Cancelar" />
                            </div>
                        </Form>
                    </Filial>
                </Modal>
            )}
        </>
    );
}

export default Contributors;