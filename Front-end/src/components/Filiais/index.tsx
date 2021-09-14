import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Header, Filial, Content, TableContent } from './styles';
import Input from '../Input';
import Button from '../Button';
import * as yup from 'yup';
import Modal from '../Modal';
import { localization } from '../../utils/LocaleTable';
import MaterialTable from 'material-table';
import GetvalidationErrors from '../../utils/getValidationerros';
import { UseToast } from '../../hooks/ToastContext';
import api from '../../services/Apiclient';
import { PropsEmployee, PropsFiliais } from '../../utils/DefaultProps';
import Visibility from '@material-ui/icons/Visibility';
import { GrAdd } from 'react-icons/gr';
const Filiais: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [nameFilial, setNameFilial] = useState<string>("");
    const [method, setMethod] = useState<"insert" | "update">("insert");
    const [openModalAddFilial, setOpenModalAddFilial] = useState<boolean>(false);
    const [ModalEmployee, setModalEmployee] = useState<boolean>(false);
    const [employee, setEmployees] = useState<PropsEmployee[]>([])
    const [filiais, setFiliais] = useState<PropsFiliais[]>([]);
    const [filialSelected, setfilialSelected] = useState<PropsFiliais | null>(null);
    const { addToast } = UseToast();
    const columns = [
        { title: "Id", field: "id" },
        { title: "Filial", field: "name" },
        { title: "Total de funcionários", field: "numberFuncionarios" },
    ];

    useEffect(() => {
        api.get('filiais').then(response => setFiliais(response.data));
    }, []);
    useEffect(() => {
        if (ModalEmployee)
            api.get(`filial?id=${filialSelected?.id}`).then(response => setEmployees(response.data.funcionarios));
    }, [ModalEmployee]);
    //#################################### função que seleciona o metodo  a ser usado na modal
    const SelectMethod = useCallback(async (method: "insert" | "update") => {
        setMethod(method);
        setOpenModalAddFilial(true)
    }, [])

    //##################################### função que verifica o metodo selecionado em SelectMethod e executa uma função de acordo
    const ActionFilial = useCallback(async (data: PropsFiliais) => {
        try {
            formRef.current?.setErrors({});
            const schema = yup.object().shape({
                name: yup.string().required('O nome é obrigatório'),
            });

            await schema.validate(data, { abortEarly: false });
            if (method == "insert") {
                AddFilial(data);
            } else {
                if (data.name == filialSelected!.name) {
                    throw new Error("O nome continua igual ao nome anterior");
                }
                const Data = {
                    id: filialSelected!.id,
                    name: data.name,
                }
                UpdateFilial(Data);
            }
        } catch (err) {
            let errormsg = err;
            if (err instanceof yup.ValidationError) {
                const erros = GetvalidationErrors(err);
                errormsg = erros;
            }

            if (err instanceof Error) {
                errormsg = err;
            }
            addToast({
                type: 'error',
                title: `Erro`,
                description: `${errormsg}`
            });

        }
    }, [method, nameFilial, addToast, filialSelected, formRef]);

    const AddFilial = useCallback(async (data: PropsFiliais) => {
        try {
            await api.post('filiais', data).then(response => {
                setFiliais(olddata => [...olddata, response.data]);
                addToast({
                    type: 'success',
                    title: 'Sucesso',
                    description: `${data.name} salva com sucesso!`
                });
            }).catch(err => {
                throw new Error(err.response.data.message);
            })
            setOpenModalAddFilial(false);
        } catch (err) {
            let errormsg = err;
            if (err instanceof Error) {
                errormsg = err;
            }
            addToast({
                type: 'error',
                title: `Erro`,
                description: `${errormsg}`
            });
        }

    }, [filiais]);

    const UpdateFilial = useCallback(async (data: object) => {

        try {
            //@ts-ignore
            await api.put('filiais', { id: data!.id, name: data.name }).then(response => {

                const temp = [...filiais];

                temp.find(item => {
                    //@ts-ignore
                    if (item.id == data!.id) {
                        //@ts-ignore
                        item.name = data.name;
                        console.log("teste")
                    }
                });

                setFiliais(temp);
                setOpenModalAddFilial(false);

                addToast({
                    type: 'success',
                    title: 'Sucesso',
                    description: `${nameFilial} atualizada com sucesso!`
                });
                setNameFilial("");
                setfilialSelected(null)

            }).catch(err => {
                throw new Error(err.response.data.message);

            })
        } catch (err) {
            let errormsg = err;
            if (err instanceof Error) {
                errormsg = err;
            }
            addToast({
                type: 'error',
                title: `Erro`,
                description: `${errormsg}`
            });
        }
    }, [filiais, addToast]);

    // ############################### recebe o objeto selecionado na tabela e busca seu equivalente no array filiais
    // e preenche e constante setfilialSelected usda para atualização  
    const findFiliaisForUpdate = useCallback((data: object) => {
        var id = "";
        for (const [key, value] of Object.entries(data)) {
            if (key == "id") {
                id = value;
                break;
            }
        }
        const filial = filiais.find(item => item.id === id);
        setfilialSelected(filial!);
    }, [filiais]);

    return (
        <>
            <Content>
                {/* <Header>
                    <Button onClick={() => SelectMethod("insert")} stylecolor="other" style={{ width: 200 }} label="Adicionar filial" />
                </Header> */}
                <MaterialTable
                    title=
                    {
                        <Button icon={GrAdd} onClick={() => SelectMethod("insert")} stylecolor="transparent" style={{ width: 150, height: 30, borderRadius: 5, marginTop: 10, fontSize: 15 }} label="Adicionar filial" />
                    }
                    data={filiais}
                    columns={columns}
                    localization={localization}
                    style={{ color: "#5C5C5C" }}
                    options={{
                        paging: true,
                        pageSize: 10,
                        maxBodyHeight: 450,
                        addRowPosition: 'first',
                        headerStyle: {
                            fontWeight: 700,
                            fontSize: 16,
                            color: "#5C5C5C"
                        }
                    }}
                    editable={{
                        onRowDelete: oldData =>
                            new Promise<void>((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...filiais];
                                    for (const [key, value] of Object.entries(oldData)) {
                                        if (key == "tableData") {
                                            const selected = dataDelete.splice(value.id, 1)[0];
                                            api.delete(`filiais?id=${selected.id}`).then(response => {
                                                addToast({
                                                    type: 'info',
                                                    title: 'Sucesso',
                                                    //@ts-ignore
                                                    description: `${selected.name} deletado com sucesso!`
                                                });
                                                setFiliais([]);
                                                setFiliais([...dataDelete]);
                                            }).catch(err => {
                                                addToast({
                                                    type: 'error',
                                                    title: 'Erro ao deletar',
                                                    //@ts-ignore
                                                    description: `Não foi possivel deletar a filial ${selected.name}`
                                                });
                                            });
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
                                setOpenModalAddFilial(true);
                                findFiliaisForUpdate(rowData);
                            }
                        },
                        {
                            icon: Visibility,
                            tooltip: 'View',
                            onClick: (event, rowData) => {
                                setModalEmployee(true);
                                //@ts-ignore
                                setfilialSelected(rowData);
                            }
                        }
                    ]}
                >

                </MaterialTable>
            </Content>
            {openModalAddFilial && (
                <Modal title={method == "insert" ? "Adicionar filial" : "Atualizar filial"} isVisible={openModalAddFilial}>
                    <Filial>
                        <Form ref={formRef} onSubmit={ActionFilial}>
                            <div>
                                <label> Nome
                                    <Input name="name" defaultValue={filialSelected ? filialSelected.name : ""} onChange={(val) => setNameFilial(val.target.value)} />
                                </label>
                                {method == "update" && (
                                    <label> Numero de funcionários
                                        <Input name="numberEmployee" disabled defaultValue={filialSelected?.numberFuncionarios} />
                                    </label>
                                )}
                            </div>
                            <div className="controls">
                                <Button type="submit" style={{ width: 200 }} stylecolor="ok" label="Salvar" />
                                <Button onClick={() => setOpenModalAddFilial(false)} style={{ width: 200 }} stylecolor="cancel" label="Cancelar" />
                            </div>
                        </Form>
                    </Filial>
                </Modal>
            )}

            {ModalEmployee && (
                //@ts-ignore
                <Modal title={"Filial " + filialSelected?.name} isVisible={ModalEmployee}>
                    <div>
                        <br />
                        <h3>Funcionários</h3>
                        <br />
                        {employee.length == 0 && <h1>no momento não existem funcionários cadastrados para esta filial</h1>}
                    </div>
                    <TableContent style={{flex:1}}>

                        {employee.length > 0 && (
                            <table>
                                <tr>
                                    <th>Nome</th>
                                </tr>
                                {employee.map(item =>
                                    <tr>
                                        <td>{item.name}</td>
                                    </tr>
                                )}
                            </table>
                        )}
                    </TableContent>
                    <Button onClick={() => setModalEmployee(false)} style={{ width: 200, marginTop: 20 }} stylecolor="cancel" label="Fechar" />
                </Modal>
            )}
        </>
    );
}

export default Filiais;