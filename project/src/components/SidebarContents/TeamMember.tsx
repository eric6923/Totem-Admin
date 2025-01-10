import { useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

const TeamMemberComponent = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Doe',
      role: 'Software Engineer',
      imageUrl: '/api/placeholder/100/100'
    },
    {
      id: '2',
      name: 'John Doe',
      role: 'Software Engineer',
      imageUrl: '/api/placeholder/100/100'
    },
    {
      id: '3',
      name: 'John Doe',
      role: 'Software Engineer',
      imageUrl: '/api/placeholder/100/100'
    },
    {
      id: '4',
      name: 'John Doe',
      role: 'Software Engineer',
      imageUrl: '/api/placeholder/100/100'
    },
    {
      id: '5',
      name: 'John Doe',
      role: 'Software Engineer',
      imageUrl: '/api/placeholder/100/100'
    },
    {
      id: '6',
      name: 'John Doe',
      role: 'Software Engineer',
      imageUrl: '/api/placeholder/100/100'
    },
    {
      id: '7',
      name: 'John Doe',
      role: 'Software Engineer',
      imageUrl: '/api/placeholder/100/100'
    },
    {
      id: '8',
      name: 'John Doe',
      role: 'Software Engineer',
      imageUrl: '/api/placeholder/100/100'
    },
    {
      id: '9',
      name: 'John Doe',
      role: 'Software Engineer',
      imageUrl: '/api/placeholder/100/100'
    }
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    role: '',
    imageUrl: '/api/placeholder/100/100'
  });

  const handleAdd = () => {
    const newMember = {
      id: Date.now().toString(),
      ...formData
    };
    setMembers([...members, newMember]);
    setIsAdding(false);
    setFormData({ name: '', role: '', imageUrl: '/api/placeholder/100/100' });
  };

  const handleEdit = (id: string) => {
    const member = members.find(m => m.id === id);
    if (member) {
      setFormData({ name: member.name, role: member.role, imageUrl: member.imageUrl });
      setIsEditing(id);
    }
  };

  const handleUpdate = (id: string) => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, ...formData } : member
    ));
    setIsEditing(null);
    setFormData({ name: '', role: '', imageUrl: '/api/placeholder/100/100' });
  };

  const handleDelete = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const renderForm = (isAdd: boolean, memberId?: string) => (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => {
            isAdd ? setIsAdding(false) : setIsEditing(null);
            setFormData({ name: '', role: '', imageUrl: '/api/placeholder/100/100' });
          }}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={() => isAdd ? handleAdd() : handleUpdate(memberId!)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isAdd ? 'Add Member' : 'Update Member'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </button>
      </div>

      {isAdding && renderForm(true)}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map(member => (
          <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {isEditing === member.id ? (
              renderForm(false, member.id)
            ) : (
              <>
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(member.id)}
                      className="p-2 text-blue-500 hover:text-blue-600"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMemberComponent;