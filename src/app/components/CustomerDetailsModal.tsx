import { useState } from 'react';
import { Plus, Pencil, Trash, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

interface Target {
  id: string;
  accountNo: string;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  mobile: string;
  creditLimit: string;
  lastBalance: string;
  terms: string;
  daysUntilDue: string;
  routeNumber: string;
  stopNumber: string;
  operationHours: string;
  memo: string;
  store: string;
  notes: Array<{ id: string; text: string; date: string }>;
}

interface CustomerDetailsModalProps {
  target: Target;
  onClose: () => void;
  onUpdateTarget: (targetId: string, updates: Partial<Target>) => void;
}

export function CustomerDetailsModal({ target, onClose, onUpdateTarget }: CustomerDetailsModalProps) {
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState('');

  const handleAddNote = () => {
    if (!noteText.trim()) {
      toast.error('Please enter a note.');
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      text: noteText,
      date: new Date().toLocaleString()
    };

    const updatedNotes = [...target.notes, newNote];
    onUpdateTarget(target.id, { notes: updatedNotes });
    
    setNoteText('');
    setShowAddNote(false);
    toast.success('Note added');
  };

  const handleEditNote = (noteId: string) => {
    const note = target.notes.find(n => n.id === noteId);
    if (note) {
      setEditingNoteId(noteId);
      setEditingNoteText(note.text);
    }
  };

  const handleSaveEdit = () => {
    if (!editingNoteText.trim()) {
      toast.error('Please enter a note.');
      return;
    }

    const updatedNotes = target.notes.map(note =>
      note.id === editingNoteId
        ? { ...note, text: editingNoteText, date: new Date().toLocaleString() }
        : note
    );

    onUpdateTarget(target.id, { notes: updatedNotes });
    setEditingNoteId(null);
    setEditingNoteText('');
    toast.success('Note updated');
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = target.notes.filter(note => note.id !== noteId);
    onUpdateTarget(target.id, { notes: updatedNotes });
    toast.success('Note deleted');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Customer Details</DialogTitle>
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowAddNote(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Notes
            </Button>
          </div>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p>{target.accountNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Customer Name</p>
                <p>{target.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Company Name</p>
                <p>{target.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p>{target.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p>{target.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p>{target.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mobile</p>
                <p>{target.mobile}</p>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Financial Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Credit Limit</p>
                <p>{target.creditLimit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Balance</p>
                <p>{target.lastBalance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Terms</p>
                <p>{target.terms}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Days Until Due</p>
                <p>{target.daysUntilDue} days</p>
              </div>
            </CardContent>
          </Card>

          {/* Route Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Route Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Route Number</p>
                <p>{target.routeNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Stop Number</p>
                <p>{target.stopNumber}</p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Operation Hours</p>
                <p>{target.operationHours}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Memo</p>
                <p>{target.memo}</p>
              </div>
            </CardContent>
          </Card>

          {/* Sales Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sales Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {target.notes.length === 0 ? (
                <p className="text-gray-500 text-sm">No notes added yet.</p>
              ) : (
                target.notes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-3">
                    {editingNoteId === note.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editingNoteText}
                          onChange={(e) => setEditingNoteText(e.target.value)}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSaveEdit}>
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingNoteId(null);
                              setEditingNoteText('');
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="mb-1">{note.text}</p>
                            <p className="text-xs text-gray-500">{note.date}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditNote(note.id)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteNote(note.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>

        {/* Add Note Dialog */}
        {showAddNote && (
          <Dialog open={showAddNote} onOpenChange={setShowAddNote}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Notes</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 py-4 border-b">
                  <div>
                    <p className="text-sm text-gray-600">Customer Name:</p>
                    <p>{target.accountNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Store:</p>
                    <p>{target.store}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">
                    Note <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="note"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Enter your note here..."
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddNote(false);
                      setNoteText('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddNote}>Add Note</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}
