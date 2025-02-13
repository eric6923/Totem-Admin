import { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

interface NewMember {
  name: string;
  role: string;
  imageUrl: string;
}

const TeamMemberComponent = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "John Doe",
      role: "Software Engineer",
      imageUrl: "/api/placeholder/128/128",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState<NewMember>({
    name: "",
    role: "",
    imageUrl: "/api/placeholder/128/128",
  });

  const handleDelete = (id: number): void => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleEdit = (member: TeamMember): void => {
    setEditingMember(member);
    setNewMember({
      name: member.name,
      role: member.role,
      imageUrl: member.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleAdd = (): void => {
    setEditingMember(null);
    setNewMember({
      name: "",
      role: "",
      imageUrl: "/api/placeholder/128/128",
    });
    setIsModalOpen(true);
  };

  const handleSave = (): void => {
    if (editingMember) {
      setMembers(
        members.map((member) =>
          member.id === editingMember.id ? { ...member, ...newMember } : member
        )
      );
    } else {
      const newMemberWithId: TeamMember = {
        ...newMember,
        id: Date.now(),
      };
      setMembers([...members, newMemberWithId]);
    }
    setIsModalOpen(false);
    setNewMember({
      name: "",
      role: "",
      imageUrl: "/api/placeholder/128/128",
    });
    setEditingMember(null);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-black/5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-16">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
            Manage Pricing
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Add, edit, or remove Pricing Details
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
        >
          <Plus className="w-5 h-5" />
          Add Catalogue
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="relative bg-gradient-to-b from-black to-blue-900 mt-16 p-6 rounded-2xl w-full sm:w-[290px] h-[210px] shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-blue-900/20"
          >
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 rounded-full border-4 border-blue-600 p-1 bg-black">
                <img
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  src={member.imageUrl}
                />
              </div>
            </div>
            <div className="absolute top-2 sm:top-4 right-3 sm:right-1 flex gap-2">
              <button
                onClick={() => handleEdit(member)}
                className="p-1.5 sm:p-2 text-blue-400 hover:text-blue-300 transition-colors"
                title="Edit member"
              >
                <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="p-1.5 sm:p-2 text-blue-400 hover:text-red-400 transition-colors"
                title="Delete member"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-lg sm:text-xl font-semibold uppercase text-blue-400">
                {member.name}
              </h3>
              <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-b from-black to-blue-900 rounded-2xl p-8 w-full max-w-md relative border border-blue-900/20">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-blue-400 mb-6">
              {editingMember ? "Edit Member" : "Add New Member"}
            </h2>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-blue-300 mb-2"
                >
                  Course Name
                </label>
                <input
                  id="name"
                  className="w-full px-4 py-3 bg-black/50 text-white rounded-lg border border-blue-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                  placeholder="Enter Course name"
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-blue-300 mb-2"
                >
                  Duration
                </label>
                <input
                  id="role"
                  className="w-full px-4 py-3 bg-black/50 text-white rounded-lg border border-blue-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({ ...newMember, role: e.target.value })
                  }
                  placeholder="Enter Duration"
                />
              </div>
              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-blue-300 mb-2"
                >
                  Price
                </label>
                <input
                  id="imageUrl"
                  className="w-full px-4 py-3 bg-black/50 text-white rounded-lg border border-blue-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                  value={newMember.imageUrl}
                  onChange={(e) =>
                    setNewMember({ ...newMember, imageUrl: e.target.value })
                  }
                  placeholder="Enter Price Amount"
                />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemberComponent;
