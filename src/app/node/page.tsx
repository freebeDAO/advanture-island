"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Space,
    Table,
    Button,
    message,
    Popconfirm,
    Pagination,
    Spin,
} from "antd";
import type { PopconfirmProps, TableProps } from "antd";
import Title from "antd/es/typography/Title";
import { format } from "date-fns";

interface DataType {
    id: number;
    x: number;
    y: number;
    createdAt: Date;
    updatedAt: Date;
}

export default function NodePage() {
    const [nodes, setNodesState] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();
    function handlerEditingNode(id: number): void {
        router.push(`/node/${id}/edit`);
    }
    function handlerCreateNode(): void {
        router.push(`/node/create`);
    }

    function handleDeleteNode(id: number): void {
        fetch(`/api/node/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                message.success("删除成功");
                setNodesState(nodes.filter((node) => node.id !== id));
            }
        });
        console.log(`delete: ${id}`);
    }

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "主键Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "X坐标",
            dataIndex: "x",
            key: "x",
        },
        {
            title: "Y坐标",
            dataIndex: "y",
            key: "y",
        },
        {
            title: "创建时间",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => (
                <a>{format(createdAt, "yyyy-MM-dd HH:mm:ss")}</a>
            ),
        },
        {
            title: "修改时间",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (updatedAt) => (
                <a>{format(updatedAt, "yyyy-MM-dd HH:mm:ss")}</a>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        color="primary"
                        variant="solid"
                        onClick={() => handlerCreateNode()}
                    >
                        新增
                    </Button>
                    <Button
                        color="default"
                        variant="outlined"
                        onClick={() => handlerEditingNode(record.id)}
                    >
                        编辑
                    </Button>
                    <Popconfirm
                        title="删除记录"
                        description="确定删除这条记录吗"
                        onConfirm={() => handleDeleteNode(record.id)}
                        okText="是"
                        cancelText="否"
                    >
                        <Button danger>删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const fetchData = (page: number, pageSize: number) => {
        setIsLoaded(false);
        const params = new URLSearchParams({
            page: page.toString(),
            pageSize: pageSize.toString(),
        });
        fetch(`/api/node?${params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                res.json().then((result) => {
                    setNodesState(result.data.data);
                    setTotal(result.data.total);
                    setIsLoaded(true);
                });
            }
        });
    };
    useEffect(() => {
        fetchData(page, pageSize);
    }, []);

    return (
        <main style={{ padding: "2rem" }}>
            <Title level={2}>Nodes</Title>
            <Spin tip="Loading..." spinning={!isLoaded}>
                <Table<DataType>
                    columns={columns}
                    dataSource={nodes}
                    pagination={false}
                />
                <Pagination
                    style={{ marginTop: "25px" }}
                    total={total}
                    pageSize={pageSize}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `总共 ${total} 条`}
                    onShowSizeChange={(current, size) => {
                        setPageSize(size);
                    }}
                    onChange={(page, pageSize) => fetchData(page, pageSize)}
                />
            </Spin>
        </main>
    );
}
