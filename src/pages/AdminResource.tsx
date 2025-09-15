import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FieldDef {
  name: string;
  type?: "text" | "number" | "date" | "array";
}

const fieldMap: Record<string, FieldDef[]> = {
  products: [
    { name: "name" },
    { name: "description" },
    { name: "price", type: "number" },
    { name: "category" },
  ],
  users: [
    { name: "name" },
    { name: "email" },
  ],
  orders: [
    { name: "user" },
    { name: "products", type: "array" },
    { name: "total", type: "number" },
    { name: "status" },
  ],
  promotions: [
    { name: "name" },
    { name: "description" },
    { name: "discount", type: "number" },
    { name: "startDate", type: "date" },
    { name: "endDate", type: "date" },
  ],
  coupons: [
    { name: "code" },
    { name: "discount", type: "number" },
    { name: "expiresAt", type: "date" },
  ],
};

const API_BASE = "http://localhost:3000/api";

const AdminResource = () => {
  const { resource } = useParams();
  const fields = resource ? fieldMap[resource] : undefined;
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data = [] } = useQuery({
    queryKey: [resource],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/${resource}`);
      return res.json();
    },
    enabled: !!resource,
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload: Record<string, unknown> = {};
      fields?.forEach((f) => {
        const value = formData[f.name];
        if (f.type === "number") payload[f.name] = value ? Number(value) : undefined;
        else if (f.type === "array")
          payload[f.name] = value ? value.split(",").map((v) => v.trim()) : [];
        else if (f.type === "date") payload[f.name] = value ? new Date(value) : undefined;
        else payload[f.name] = value;
      });
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_BASE}/${resource}/${editingId}`
        : `${API_BASE}/${resource}`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
      setFormData({});
      setEditingId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`${API_BASE}/${resource}/${id}`, { method: "DELETE" });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resource] }),
  });

  if (!resource || !fields) {
    return (
      <div className="p-4">
        <p className="mb-4">Unknown resource.</p>
        <Button asChild>
          <Link to="/admin">Back to dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">Manage {resource}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate();
            }}
            className="flex flex-wrap gap-4 mb-6"
          >
            {fields.map((field) => (
              <div key={field.name} className="w-48">
                <label className="block text-sm font-medium mb-1 capitalize">
                  {field.name}
                </label>
                <Input
                  type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                />
              </div>
            ))}
            <div className="flex items-end gap-2">
              <Button type="submit">{editingId ? "Update" : "Create"}</Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({});
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                {fields.map((f) => (
                  <TableHead key={f.name} className="capitalize">
                    {f.name}
                  </TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell>{item._id}</TableCell>
                  {fields.map((f) => (
                    <TableCell key={f.name}>
                      {Array.isArray(item[f.name])
                        ? item[f.name].join(", ")
                        : item[f.name]?.toString?.()}
                    </TableCell>
                  ))}
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingId(item._id);
                        const newData: Record<string, string> = {};
                        fields.forEach((f) => {
                          const val = item[f.name];
                          if (Array.isArray(val)) newData[f.name] = val.join(",");
                          else if (f.type === "date" && typeof val === "string")
                            newData[f.name] = val.slice(0, 10);
                          else newData[f.name] = val?.toString?.() || "";
                        });
                        setFormData(newData);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(item._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminResource;

