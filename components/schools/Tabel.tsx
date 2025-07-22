"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { useState } from "react";

interface SchoolsTableProps {
  onEdit: (school: any) => void;
}

export function SchoolsTable({ onEdit }: SchoolsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState<any>(null);

  const {
    data: schools,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["schools"],
    queryFn: async () => {
      const res = await fetch("/api/schools");
      if (!res.ok) {
        throw new Error("Failed to fetch schools");
      }
      return res.json();
    },
  });

  const handleDeleteClick = (school: any) => {
    setSchoolToDelete(school);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-sm text-gray-500">Loading schools...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-sm text-red-500">Error loading schools</div>
      </div>
    );
  }

  if (!schools?.length) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-sm text-gray-500">No schools found</div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>School Name</TableHead>
              <TableHead>Principal</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schools.map((school: any) => (
              <TableRow key={school._id}>
                <TableCell className="font-medium">{school.name}</TableCell>
                <TableCell>{school.principalName}</TableCell>
                <TableCell>{school.email}</TableCell>
                <TableCell>{school.phone}</TableCell>
                <TableCell>{school.address}</TableCell>
                <TableCell>
                  <Badge variant="secondary">Active</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(school)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(school)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        school={schoolToDelete}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSchoolToDelete(null);
        }}
      />
    </>
  );
}
