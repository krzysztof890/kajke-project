using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AngularKajke.Database
{
  /// <summary>
  /// Główna klasa sluzaca do reprezentacji modelu db
  /// </summary>
  public partial class KajkeContext : IdentityDbContext<ApplicationUser>
  {
    #region Constructor

    public KajkeContext(DbContextOptions<KajkeContext> options) : base(options)
    {
    }

    #endregion Constructor

    #region Public Properties

    public virtual DbSet<Answers> Answers { get; set; }
    public virtual DbSet<Survey> Survey { get; set; }
    public virtual DbSet<AnswerResult> AnswerResult { get; set; }

    #endregion Public Properties

    /// <summary>
    /// Rzeczy zwiazne z mapowaniem tabel
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<AnswerResult>(entity =>
      {
        entity.Property(e => e.Id)
            .HasColumnName("id");
        //.ValueGeneratedNever();

        entity.Property(e => e.IdAnswer).HasColumnName("idAnswer");

        entity.Property(e => e.Result)
            .IsRequired()
            .HasColumnName("result")
            .HasMaxLength(300)
            .IsUnicode(false);

        entity.HasOne(d => d.IdAnswerNavigation)
            .WithMany(p => p.AnswerResult)
            .HasForeignKey(d => d.IdAnswer)
            .HasConstraintName("FK_AnswerResult_Answers");
      });

      modelBuilder.Entity<Answers>(entity =>
      {
        entity.HasKey(e => e.IdAnswer);

        entity.Property(e => e.IdAnswer).HasColumnName("idAnswer");

        entity.Property(e => e.AnswerCounter).HasColumnName("answerCounter");

        entity.Property(e => e.AnswerNumber).HasColumnName("answerNumber");

        entity.Property(e => e.AnswerType).HasColumnName("answerType");

        entity.Property(e => e.IdSurvey).HasColumnName("idSurvey");

        entity.Property(e => e.QuestionNumber).HasColumnName("questionNumber");

        entity.HasOne(d => d.IdSurveyNavigation)
                   .WithMany(p => p.Answers)
                   .HasForeignKey(d => d.IdSurvey)
                   .HasConstraintName("FK_Answers_Survey");
      });

      modelBuilder.Entity<Survey>(entity =>
      {
        entity.HasKey(e => e.IdSurvey);

        entity.Property(e => e.IdSurvey).HasColumnName("idSurvey");

        entity.Property(e => e.IdUser)
            .HasColumnName("idUser")
            .HasMaxLength(450);

        entity.Property(e => e.Link)
            .IsRequired()
            .HasColumnName("link")
            .HasMaxLength(32)
            .IsUnicode(false);

        entity.Property(e => e.Name)
            .IsRequired()
            .HasColumnName("name")
            .HasMaxLength(160)
            .IsUnicode(false);

        entity.Property(e => e.Path)
            .IsRequired()
            .HasColumnName("path")
            .HasMaxLength(80)
            .IsUnicode(false);
      });
    }
  }
}
