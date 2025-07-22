// SchoolSheet.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchoolFormData, schoolSchema } from "@/lib/validations/school";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface SchoolSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingSchool?: any;
  onClose: () => void;
}

export function SchoolSheet({
  open,
  onOpenChange,
  editingSchool,
  onClose,
}: SchoolSheetProps) {
  const queryClient = useQueryClient();
  const isEditing = !!editingSchool;

  const form = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: editingSchool
      ? {
          name: editingSchool.name,
          principalName: editingSchool.principalName,
          email: editingSchool.email,
          phone: editingSchool.phone,
          address: editingSchool.address,
        }
      : {
          name: "",
          principalName: "",
          email: "",
          phone: "",
          address: "",
        },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const [credentialsDialogOpen, setCredentialsDialogOpen] =
    React.useState(false);
  const [credentials, setCredentials] = React.useState<{
    email: string;
    password: string;
  } | null>(null);

  React.useEffect(() => {
    if (editingSchool) {
      reset({
        name: editingSchool.name,
        principalName: editingSchool.principalName,
        email: editingSchool.email,
        phone: editingSchool.phone,
        address: editingSchool.address,
      });
    } else {
      reset({
        name: "",
        principalName: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  }, [editingSchool, reset]);

  const mutation = useMutation({
    mutationFn: async (data: SchoolFormData) => {
      const url = isEditing
        ? `/api/schools/${editingSchool._id}`
        : "/api/schools";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to save school");
      }

      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });

      if (!isEditing && data.credentials) {
        setCredentials(data.credentials);
        setCredentialsDialogOpen(true);
      }

      toast({
        title: "Success",
        description: isEditing
          ? "School updated successfully"
          : "School created successfully",
      });

      reset();
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: isEditing
          ? "Error updating school"
          : "Error creating school",
        variant: "destructive",
      });
    },
  });

  const handleFormSubmit = (data: SchoolFormData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>
              {isEditing ? "Edit School" : "Add New School"}
            </SheetTitle>
          </SheetHeader>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-4 mt-6"
          >
            <div className="space-y-2">
              <Label htmlFor="name">School Name</Label>
              <Input
                id="name"
                placeholder="Enter school name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="principalName">Principal Name</Label>
              <Input
                id="principalName"
                placeholder="Enter principal name"
                {...register("principalName")}
              />
              {errors.principalName && (
                <p className="text-sm text-red-500">
                  {errors.principalName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter email address"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter address"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1"
              >
                {mutation.isPending
                  ? isEditing
                    ? "Updating..."
                    : "Creating..."
                  : isEditing
                  ? "Update School"
                  : "Create School"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      <Dialog
        open={credentialsDialogOpen}
        onOpenChange={setCredentialsDialogOpen}
      >
        <DialogContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Principal Login Credentials
            </h3>
            <p className="text-sm text-gray-600">
              Please save these credentials securely. The password will not be
              shown again.
            </p>
            {credentials && (
              <div className="space-y-2 p-4 bg-gray-50 rounded-md">
                <div>
                  <strong>Email:</strong> {credentials.email}
                </div>
                <div>
                  <strong>Password:</strong> {credentials.password}
                </div>
              </div>
            )}
            <Button
              onClick={() => setCredentialsDialogOpen(false)}
              className="w-full"
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
