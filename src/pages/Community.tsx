import { Book, GraduationCap, Users, Download, Plus, Star, User as UserIcon } from 'lucide-react';

const pastPapers = [
  { id: '1', title: 'Calculus II - Final Exam 2023', dept: 'Mathematics Department', downloads: 245 },
  { id: '2', title: 'Organic Chemistry - Midterm 2024', dept: 'Chemistry Department', downloads: 189 },
  { id: '3', title: 'Data Structures - Quiz Collection', dept: 'Computer Science', downloads: 312 },
  { id: '4', title: 'Macroeconomics - Final 2023', dept: 'Economics Department', downloads: 156 }
];

const tutors = [
  { id: '1', name: 'Dr. Marcus Chen', subject: 'Advanced Mathematics', rate: '45', rating: '4.9', reviews: '127' },
  { id: '2', name: 'Emily Rodriguez', subject: 'Organic Chemistry', rate: '38', rating: '4.8', reviews: '89' },
  { id: '3', name: 'James Okonkwo', subject: 'Computer Science', rate: '42', rating: '5.0', reviews: '203' },
  { id: '4', name: 'Dr. Priya Sharma', subject: 'Physics & Engineering', rate: '50', rating: '4.9', reviews: '156' }
];

const studyGroups = [
  { id: '1', title: 'Linear Algebra Study Squad', course: 'Mathematics', desc: 'Weekly sessions covering matrices, vectors, and eigenvalues', members: 12 },
  { id: '2', title: 'Anatomy & Physiology Crew', course: 'Biology', desc: 'Pre-med students preparing for comprehensive exams', members: 8 },
  { id: '3', title: 'Algorithm Masters', course: 'Computer Science', desc: 'Tackling LeetCode problems and interview prep together', members: 15 },
  { id: '4', title: 'Cognitive Psych Circle', course: 'Psychology', desc: 'Exploring memory, perception, and cognitive processes', members: 6 }
];

const events = [
  { id: '1', title: 'Global Day 2026', campus: 'University of Ajman', date: 'Mar 15, 2026', type: 'Social', image: '/events/global-day.jpg' },
  { id: '2', title: 'Career Day', campus: 'Abu Dhabi University', date: 'Mar 22, 2026', type: 'Career', image: '/events/career-day.jpg' },
  { id: '3', title: 'The 4th UOS International Dental Symposium', campus: 'University of Sharjah', date: 'Mar 28, 2026', type: 'Workshop', image: '/events/dental-symposium.jpg' }
];

export default function Community() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl text-brand-navy mb-2">Community Hub</h1>
        <p className="text-brand-light-navy text-sm">Connect, collaborate, and succeed together with your peers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-navy p-2 rounded-lg text-white">
                <Book className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-brand-navy">Past Papers</h2>
            </div>
            <button className="text-brand-navy text-sm font-bold">View All</button>
          </div>

          <div className="space-y-4">
            {pastPapers.map((paper) => (
              <div key={paper.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-transparent hover:border-brand-navy transition-all group">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-brand-navy group-hover:text-white transition-colors">
                    <FileTextIcon />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-navy mb-0.5">{paper.title}</h3>
                    <p className="text-[10px] text-gray-500">{paper.dept} • {paper.downloads} downloads</p>
                  </div>
                </div>
                <button className="text-brand-light-navy hover:text-brand-navy">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-navy p-2 rounded-lg text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-brand-navy">Find a Tutor</h2>
            </div>
            <button className="text-brand-navy text-sm font-bold">View All</button>
          </div>

          <div className="space-y-6">
            {tutors.map((tutor) => (
              <div key={tutor.id} className="flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
                    <UserIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-navy">{tutor.name}</h3>
                    <p className="text-[10px] text-gray-400 mb-1">{tutor.subject} • AED {tutor.rate}/hr</p>
                    <div className="flex items-center text-[10px] text-brand-gold">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      <span className="font-bold">{tutor.rating}</span>
                      <span className="text-gray-400 ml-1">({tutor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <button className="bg-brand-navy text-white px-8 py-2 rounded-lg text-sm font-bold hover:bg-brand-light-navy transition-colors">
                  Book
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-1">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-navy p-2 rounded-lg text-white">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-brand-navy">Study Groups</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-brand-navy text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center">
                <Plus className="w-4 h-4 mr-1" /> Create Group
              </button>
              <button className="text-brand-navy text-sm font-bold">View All</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyGroups.map((group) => (
              <div key={group.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-gray-100 text-[10px] font-bold text-gray-500 px-3 py-1 rounded">
                    {group.course}
                  </span>
                  <div className="flex items-center text-[10px] text-gray-400">
                    <Users className="w-3 h-3 mr-1" /> {group.members} members
                  </div>
                </div>
                <h3 className="text-sm font-bold text-brand-navy mb-2">{group.title}</h3>
                <p className="text-[10px] text-gray-500 mb-6 line-clamp-2">{group.desc}</p>
                <div className="mt-auto flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"></div>
                    ))}
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-400">
                      +{group.members - 3}
                    </div>
                  </div>
                  <button className="text-sm font-bold text-brand-navy hover:underline">Join</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-1">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-navy p-2 rounded-lg text-white">
                <Book className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-brand-navy">Campus Events</h2>
            </div>
            <button className="text-brand-navy text-sm font-bold">View All</button>
          </div>

          <div className="space-y-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1 rounded">
                      {event.type}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold">{event.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy mb-1">{event.title}</h3>
                  <div className="flex items-center text-[10px] text-gray-400 mb-6">
                    <div className="w-4 h-4 bg-gray-300 rounded-sm mr-2"></div>
                    {event.campus}
                  </div>
                  <button className="w-full bg-[#4A6D8C] text-white py-3 rounded-lg font-bold hover:bg-brand-navy transition-colors">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function FileTextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}
