import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { ChannelPartnerDashboard } from './channel-partner-dashboard'
import { ChannelPartner } from '@/interfaces/channel-partner-interface'
import {User} from "@/interfaces/user-interface";

interface ChannelPartnerModalProps {
  isOpen: boolean
  onClose: () => void
  partner?: ChannelPartner
  currentUser: User
  onSave: (partner: ChannelPartner) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ChannelPartnerModal({ isOpen, onClose, partner, currentUser, onSave }: ChannelPartnerModalProps) {
  const [editMode, setEditMode] = useState(!partner)
  const [formData, setFormData] = useState<ChannelPartner>({
    id: '',
    name: '',
    status: 'active',
    bookingsThisMonth: 0,
    totalRevenue: 0,
    commissionRate: 0,
    contactEmail: '',
    contactPhone: '',
    imageUrl: ''
  })

  useEffect(() => {
    if (partner) {
      setFormData(partner)
    } else {
      setFormData({
        id: `CP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        name: '',
        status: 'active',
        bookingsThisMonth: 0,
        totalRevenue: 0,
        commissionRate: 0,
        contactEmail: '',
        contactPhone: '',
        imageUrl: ''
      })
    }
  }, [partner])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {partner && (
              <Image
                src={partner.imageUrl}
                alt={partner.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            {partner ? `Channel Partner: ${partner.name}` : 'New Channel Partner'}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={partner ? "dashboard" : "details"}>
          <TabsList>
            {partner && <TabsTrigger value="dashboard">Dashboard</TabsTrigger>}
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          {partner && (
            <TabsContent value="dashboard">
              <ChannelPartnerDashboard partner={partner} />
            </TabsContent>
          )}
          <TabsContent value="details">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Partner Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    name="status"
                    value={formData.status}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'active' | 'inactive' }))}
                    disabled={!editMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                  <Input
                    id="commissionRate"
                    name="commissionRate"
                    type="number"
                    value={formData.commissionRate}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    required
                  />
                </div>
              </div>
              {editMode && (
                <Button type="submit" className="w-full">
                  {partner ? 'Update Partner' : 'Create Partner'}
                </Button>
              )}
            </form>
          </TabsContent>
          <TabsContent value="contact">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  required
                />
              </div>
            </form>
          </TabsContent>
        </Tabs>
        {partner && !editMode && (
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={() => setEditMode(true)}>
              Edit
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

