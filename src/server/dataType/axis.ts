export interface axisBaseType {
    x: number;
    y: number;
}

export interface axisType extends axisBaseType {
    id: number;
}

export interface axisCreateType extends axisBaseType {
    createTime: string;
    updateTime: string;
}

export interface axisUpdateType extends axisBaseType {
    updateTime: string;
}
