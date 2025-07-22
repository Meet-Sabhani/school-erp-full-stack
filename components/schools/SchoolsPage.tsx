// SchoolsPage.tsx
import { Button } from "../ui/button";
import { SchoolsTable } from "./SchoolsTable";
import { SchoolSheet } from "./SchoolSheet";
import { useState } from "react";

const SchoolsPage = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);

  const handleAddSchool = () => {
    setEditingSchool(null);
    setSheetOpen(true);
  };

  const handleEditSchool = (school: any) => {
    setEditingSchool(school);
    setSheetOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Schools</h1>
        <Button onClick={handleAddSchool}>Add School</Button>
      </div>
      
      <SchoolsTable onEdit={handleEditSchool} />
      
      <SchoolSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        editingSchool={editingSchool}
        onClose={() => {
          setSheetOpen(false);
          setEditingSchool(null);
        }}
      />
    </div>
  );
};

export default SchoolsPage;



// DeleteConfirmDialog.tsx
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  school: any;
  onClose: () => void;
}

export function DeleteConfirmDialog({ 
  open, 
  onOpenChange, 
  school, 
  onClose 
}: DeleteConfirmDialogProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (schoolId: string) => {
      const res = await fetch(`/api/schools/${schoolId}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        throw new Error("Failed to delete school");
      }
      
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      toast({
        title: "Success",
        description: "School deleted successfully",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Error deleting school",
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    if (school?._id) {
      deleteMutation.mutate(school._id);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the school 
            "{school?.name}" and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Additional API endpoints needed

// GET /api/schools
export async function GET() {
  await connectDB();
  
  try {
    const schools = await School.find({}).populate('principalUser');
    return NextResponse.json(schools);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 });
  }
}

// PUT /api/schools/[id]
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  
  try {
    const body = await req.json();
    const { name, principalName, email, phone, address } = body;
    
    const school = await School.findByIdAndUpdate(
      params.id,
      { name, principalName, email, phone, address },
      { new: true }
    );
    
    if (!school) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }
    
    // Also update the principal user info
    await User.findByIdAndUpdate(school.principalUser, {
      name: principalName,
      email,
      phone,
      address,
    });
    
    return NextResponse.json(school);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update school" }, { status: 500 });
  }
}

// DELETE /api/schools/[id]
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  
  try {
    const school = await School.findById(params.id);
    
    if (!school) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }
    
    // Delete the principal user as well
    await User.findByIdAndDelete(school.principalUser);
    
    // Delete the school
    await School.findByIdAndDelete(params.id);
    
    return NextResponse.json({ message: "School deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete school" }, { status: 500 });
  }
}