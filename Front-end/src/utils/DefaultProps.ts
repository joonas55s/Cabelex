export interface PropsFiliais {
    id: string;
    name: string;
    numberFuncionarios: number;
};
export interface PropsEmployee {
    id: string;
    name: string;
    filial: PropsFiliais;
    filial_id?: string;
};