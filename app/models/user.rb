class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # == Constants ============================================================
  EMAIL_REGEXP = /\A[\w+\-.]+@[a-zA-Z\d\-]+(\.[a-zA-Z]+)*\.[a-zA-Z]+\z/

  # == Attributes ===========================================================
  
  # == Extensions ===========================================================
  
  # == Relationships ========================================================
  has_many :saved_jobs
  # has_many :jobs, :through => :saved_jobs
  has_many :favorites, :through => :saved_jobs, :source => :job
  # == Validations ==========================================================
  validates :first_name, :last_name, :email, :account_type, presence: true
  validates :email, uniqueness: true
  validates :email, format: { with: EMAIL_REGEXP }
  validates :account_type, acceptance: {accept:['applicant', 'poster']}

  # == Scopes ===============================================================
  
  # == Callbacks ============================================================
  
  # == Class Methods ========================================================
  
  # == Instance Methods =====================================================
  def applicant?
    self.account_type == 'applicant'
  end
  def poster?
    self.account_type == 'poster'
  end
end
